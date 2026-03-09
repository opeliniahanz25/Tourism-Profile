import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Users, MapPin, Building2, Bus, School, ShieldAlert, Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { initialProfileData, type ProfileData } from '../../data/profileData';

// Tab Components
import TabBasicInfo from './TabBasicInfo';
import TabOfficials from './TabOfficials';
import TabAttractions from './TabAttractions'; 
import TabAccommodation from './TabAccomodation'; 
import TabTransport from './TabTransport'; 
import TabInstitutional from './TabInstitutional';
import TabSafety from './TabSafety';

export default function AdminPanel({ onSave: propOnSave }: any) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);

  // --- 1. LOAD DATA FROM DATABASE ---
  useEffect(() => {
    const loadFromDatabase = async () => {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/get-lgu-data/${userId}`);
        if (response.ok) {
          const dbData = await response.json();
          
          setEditData((prev: any) => ({
            ...prev,
            basicInfo: {
              ...prev.basicInfo,
              name: dbData.basicInfo?.name || "",
              province: dbData.basicInfo?.province || "",
              region: dbData.basicInfo?.region || "",
              landArea: dbData.basicInfo?.land_area || "", 
              barangays: dbData.basicInfo?.barangays || "",
              population: dbData.basicInfo?.population || "",
              languages: dbData.basicInfo?.languages || "",
              religions: dbData.basicInfo?.religion || "", 
              economicActivities: dbData.basicInfo?.economic_activities || "" 
            },
            officials: {
              ...prev.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.vice_mayor || "", 
              tourismOfficer: dbData.officials?.tourism_officer || "", 
              planningCoordinator: dbData.officials?.planning_coordinator || "",
              skFederationPresident: dbData.officials?.sk_federation_president || "",
              council: Array.isArray(dbData.officials?.council) ? dbData.officials.council : Array(10).fill(""),
              skMembers: Array.isArray(dbData.officials?.sk_members) ? dbData.officials.sk_members : []
            },
            tourismAssets: {
              ...prev.tourismAssets,
              attractions: dbData.tourismAssets?.attractions || [],
              accommodations: dbData.tourismAssets?.accommodations || [],
              facilities: dbData.tourismAssets?.facilities || [],
              // --- IMAGE PERSISTENCE FIX ---
              tourismMap: dbData.tourismAssets?.tourismMap || dbData.tourismAssets?.tourism_map || ""
            },
            transportation: {
              ...prev.transportation,
              list: Array.isArray(dbData.transportation?.list) ? dbData.transportation.list : []
            },
            institutional: dbData.institutional && Object.keys(dbData.institutional).length > 0 
                ? dbData.institutional 
                : prev.institutional,
            crimeIncidents: dbData.crimeIncidents || prev.crimeIncidents || {},
            hazardMatrix: dbData.hazardMatrix || prev.hazardMatrix || {}
          }));
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFromDatabase();
  }, []);

  // --- 2. SAVE ALL DATA TO DATABASE ---
  const handleSave = async () => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (!userId) return toast.error("LOGIN REQUIRED");

    const toastId = toast.loading("SAVING ALL CHANGES...");
    const data = editData as any;

    const saveOperations = [
      fetch(`http://localhost:3000/api/save-basic-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId, 
          name: data.basicInfo.name,
          province: data.basicInfo.province,
          region: data.basicInfo.region,
          land_area: data.basicInfo.landArea,
          barangays: data.basicInfo.barangays,
          population: data.basicInfo.population,
          languages: data.basicInfo.languages,
          religion: data.basicInfo.religions,
          economic_activities: data.basicInfo.economicActivities 
        }),
      }),
      fetch(`http://localhost:3000/api/save-officials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId,
          mayor: data.officials.mayor || "",
          vice_mayor: data.officials.viceMayor || "", 
          tourism_officer: data.officials.tourismOfficer || "",
          planning_coordinator: data.officials.planningCoordinator || "",
          sk_federation_president: data.officials.skFederationPresident || "",
          council: data.officials.council,
          sk_members: data.officials.skMembers
        }),
      }),
      fetch(`http://localhost:3000/api/save-tourism-assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId, 
          attractions: data.tourismAssets.attractions, 
          tourismMap: data.tourismAssets.tourismMap 
        }),
      }),
      fetch(`http://localhost:3000/api/save-accommodations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId, 
          accommodations: data.tourismAssets.accommodations, 
          accommodation_profile: data.tourismAssets.facilities 
        }),
      }),
      fetch(`http://localhost:3000/api/save-transport`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: userId, 
          list: data.transportation.list 
        }),
      }),
      fetch(`http://localhost:3000/api/save-institutional`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          data: data.institutional 
        }),
      }),
      fetch(`http://localhost:3000/api/save-safety`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          crimeIncidents: data.crimeIncidents,
          hazardMatrix: data.hazardMatrix
        }),
      })
    ];

    try {
      const results = await Promise.all(saveOperations);
      const allSuccessful = results.every(res => res.ok);

      if (allSuccessful) {
        toast.success("ALL DATA SAVED SUCCESSFULLY!", { id: toastId });
        if (propOnSave) propOnSave();
      } else {
        toast.error("SOME SECTIONS FAILED TO SAVE. PLEASE TRY AGAIN.", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("DATABASE CONNECTION FAILED!", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-black uppercase tracking-tighter">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p>Syncing Data...</p>
      </div>
    );
  }

  const tabs = [
    { name: "Basic Info", icon: <Info size={16}/> },
    { name: "Officials", icon: <Users size={16}/> },
    { name: "Attractions", icon: <MapPin size={16}/> },
    { name: "Accommodation", icon: <Building2 size={16}/> },
    { name: "Transport", icon: <Bus size={16}/> },
    { name: "Institutional", icon: <School size={16}/> },
    { name: "Safety", icon: <ShieldAlert size={16}/> },
  ];

  return (
    <div 
      className="min-h-screen font-sans text-gray-900 pb-20 uppercase" 
      style={{ 
        scrollbarGutter: 'stable', 
        backgroundImage: "url('/assets/Background.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Toaster position="top-right" richColors />
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-black uppercase tracking-tighter">ADMIN PANEL</h1>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 border rounded-lg text-xs font-black uppercase hover:bg-gray-50 transition-all">BACK</button>
            <button onClick={handleSave} className="px-6 py-2 bg-[#00a859] text-white rounded-lg text-xs font-black uppercase shadow-md active:scale-95 transition-all">SAVE CHANGES</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex bg-gray-200/60 p-1 rounded-xl mb-8 overflow-x-auto no-scrollbar shadow-inner border border-gray-200 font-black">
          {tabs.map((tab) => (
            <button 
              key={tab.name} 
              onClick={() => setActiveTab(tab.name)} 
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[11px] font-black uppercase whitespace-nowrap transition-all ${activeTab === tab.name ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 min-h-50 uppercase font-black">
          {activeTab === "Basic Info" && <TabBasicInfo editData={editData} setEditData={setEditData} />}
          {activeTab === "Officials" && <TabOfficials editData={editData} setEditData={setEditData} />}
          {activeTab === "Attractions" && <TabAttractions editData={editData} setEditData={setEditData} />}
          {activeTab === "Accommodation" && <TabAccommodation editData={editData} setEditData={setEditData} />}
          {activeTab === "Transport" && <TabTransport editData={editData} setEditData={setEditData} />}
          {activeTab === "Institutional" && <TabInstitutional editData={editData} setEditData={setEditData} />}
          {activeTab === "Safety" && <TabSafety editData={editData} setEditData={setEditData} />}
        </div>
      </main>
    </div>
  );
}