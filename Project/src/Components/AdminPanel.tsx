
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Info, Users, MapPin, 
  Building2, Bus, School, GraduationCap, ShieldAlert, 
  Plus, Upload
} from "lucide-react";
import { Toaster, toast } from "sonner";
import backgroundImage from '../assets/background.jpg';

// Assets & Data structure
import shesh from '../assets/shesh.png'; 
import { initialProfileData, type ProfileData } from '../data/profileData';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);

  // Load current data on mount
  useEffect(() => {
    const saved = localStorage.getItem('profileData');
    if (saved) setEditData(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(editData));
    toast.success('Profile changes saved successfully!', {
      style: { background: '#00a859', color: '#fff' }
    });
  };

  // State Update Helpers
  const updateBasic = (field: keyof ProfileData['basicInfo'], value: string) => {
    setEditData({ ...editData, basicInfo: { ...editData.basicInfo, [field]: value } });
  };

  const updateOfficial = (field: string, value: string, index?: number) => {
    if (field === 'council' && typeof index === 'number') {
      const newCouncil = [...editData.officials.council];
      newCouncil[index] = value;
      setEditData({ ...editData, officials: { ...editData.officials, council: newCouncil } });
    } else {
      setEditData({ ...editData, officials: { ...editData.officials, [field]: value } });
    }
  };

  const tabs = [
    { name: "Basic Info", icon: <Info size={16}/> },
    { name: "Officials", icon: <Users size={16}/> },
    { name: "Attractions", icon: <MapPin size={16}/> },
    { name: "Accommodation", icon: <Building2 size={16}/> },
    { name: "Transport", icon: <Bus size={16}/> },
    { name: "Institutional", icon: <School size={16}/> },
    { name: "Education", icon: <GraduationCap size={16}/> },
    { name: "Safety", icon: <ShieldAlert size={16}/> },
  ];

  return (
    <div 
    className="min-h-screen font-sans text-gray-900 pb-20 uppercase"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {/* Keep everything else (Toaster, header, main) the same below this line */}
    <Toaster position="top-right" richColors />
      
      {/* HEADER SECTION (image_792101.png) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between uppercase">
          <div className="flex items-center gap-3">
            <img src={shesh} alt="Logo" className="h-10 w-auto" />
            <div>
              <h1 className="text-lg font-black leading-none text-gray-900">Admin Dashboard</h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest">Edit Tourism Industry Profile</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all uppercase tracking-tighter shadow-sm">
              <ArrowLeft size={14} /> Back to Profile
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-[#00a859] text-white rounded-lg text-xs font-black hover:bg-[#008f4c] shadow-md transition-all active:scale-95 uppercase tracking-tighter">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* TABS NAVIGATION (image_79a06c.png) */}
        <div className="flex bg-gray-200/60 p-1 rounded-xl mb-8 overflow-x-auto no-scrollbar shadow-inner border border-gray-200 uppercase font-black">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[11px] font-black transition-all whitespace-nowrap uppercase tracking-tighter ${
                activeTab === tab.name 
                  ? "bg-white text-blue-600 shadow-md" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 min-h-[600px] uppercase font-black">
          
          {/* TAB: BASIC INFO (image_ab74dd.png / image_79a483.png) */}
          {activeTab === "Basic Info" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter mb-4">Edit Basic LGU Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Name of LGU</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase" 
                         value={editData.basicInfo.name} onChange={(e) => updateBasic('name', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Province</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase" 
                         value={editData.basicInfo.province} onChange={(e) => updateBasic('province', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Region</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none" 
                         value={editData.basicInfo.region} onChange={(e) => updateBasic('region', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Land Area</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none" 
                         value={editData.basicInfo.landArea} onChange={(e) => updateBasic('landArea', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Number of Barangays</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none" 
                         value={editData.basicInfo.barangays} onChange={(e) => updateBasic('barangays', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Ethnic Groups</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase" 
                         value={editData.basicInfo.ethnicGroups} onChange={(e) => updateBasic('ethnicGroups', e.target.value.toUpperCase())} />
                </div>
              </div>

              {/* MULTI-ROW LISTS (image_79a483.png) */}
              <div className="space-y-4 pt-4 uppercase font-black">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Religions</label>
                  <div className="space-y-2">
                    <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700" value="ROMAN CATHOLIC" readOnly />
                    <input className="w-full bg-[#f3f4f6] border border-gray-400 rounded-lg px-4 py-2 font-bold text-gray-700" value="PROTESTANTISM" readOnly />
                  </div>
                </div>
                <div className="space-y-2 pt-2 font-black">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Languages Spoken</label>
                  {['VISAYAN', 'ENGLISH', 'FILIPINO'].map(lang => (
                    <input key={lang} className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 mb-2" value={lang} readOnly />
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Major Economic Activities</label>
                  {['TOURISM', 'FISHING', 'FARMING'].map(act => (
                    <input key={act} className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 mb-2" value={act} readOnly />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: OFFICIALS (image_79a4a1.png / image_ab7803.png) */}
          {activeTab === "Officials" && (
            <div className="space-y-6 animate-in fade-in duration-300 uppercase font-black">
              <h3 className="text-sm font-black text-gray-800 tracking-tighter border-b border-gray-100 pb-3">Edit Local Government Officials</h3>
              <div className="space-y-4 max-w-5xl">
                <div className="space-y-1 font-black">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Mayor</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase" 
                         value={editData.officials.mayor} onChange={(e) => updateOfficial('mayor', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Vice Mayor</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase" 
                         value={editData.officials.viceMayor} onChange={(e) => updateOfficial('viceMayor', e.target.value.toUpperCase())} />
                </div>
                
                <div className="pt-4 font-black">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Sangguniang Bayan Members</label>
                  <div className="space-y-2">
                    {editData.officials.council.map((name, i) => (
                      <input key={i} className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-black text-gray-700 text-[11px] uppercase focus:ring-1 focus:ring-blue-400 outline-none" 
                             value={name} onChange={(e) => updateOfficial('council', e.target.value.toUpperCase(), i)} />
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-4 font-black">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Tourism Officer</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase" 
                         value={editData.officials.tourismOfficer} onChange={(e) => updateOfficial('tourismOfficer', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1 font-black">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Planning and Development Coordinator</label>
                  <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase" 
                         value={editData.officials.planningCoordinator} onChange={(e) => updateOfficial('planningCoordinator', e.target.value.toUpperCase())} />
                </div>
              </div>
            </div>
          )}

          {/* TAB: ATTRACTIONS (image_79a4aa.png / image_ab8e42.png) */}
          {activeTab === "Attractions" && (
            <div className="space-y-8 animate-in fade-in duration-300 font-black">
              <div className="flex justify-between items-center border-b pb-3 uppercase">
                <h3 className="text-sm font-black text-gray-800 tracking-tighter">Tourism Attractions and Activities</h3>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-blue-700 transition-all uppercase shadow-md">
                  <Plus size={14}/> Add Attraction
                </button>
              </div>
              <div className="bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-24 text-center">
                 <p className="text-gray-400 text-xs italic font-bold">No tourism attractions added yet. Click "Add Attraction" to begin.</p>
              </div>
              
              <div className="pt-10 border-t font-black">
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter mb-4">Local Tourism Map</h3>
                <div className="space-y-2 uppercase">
                  <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Upload Tourism Map</label>
                  <div className="flex items-center gap-4 bg-[#f3f4f6] p-4 rounded-lg border border-gray-200">
                    <input type="file" className="block w-full text-[11px] font-black text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-white file:text-blue-700 hover:file:bg-blue-50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACCOMMODATION (image_79a4c9.png) */}
          {activeTab === "Accommodation" && (
            <div className="space-y-8 animate-in fade-in duration-300 font-black">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-sm font-black text-gray-800 uppercase">Accommodation and Other Facilities</h3>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-blue-700 transition-all uppercase"><Plus size={14}/> Add Facility</button>
              </div>
              <div className="flex justify-between items-center border-b pb-3 pt-6">
                <h3 className="text-sm font-black text-gray-800 uppercase">Accommodation Profile</h3>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-blue-700 transition-all uppercase"><Plus size={14}/> Add Profile</button>
              </div>
              <div className="bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-400 text-xs italic font-bold">Configure your accommodation records above.</div>
            </div>
          )}

          {/* TAB: TRANSPORT (image_79a501.png) */}
          {activeTab === "Transport" && (
            <div className="space-y-6 animate-in fade-in duration-300 uppercase font-black">
              <h3 className="text-sm font-black text-gray-800 border-b border-gray-100 pb-3 uppercase tracking-tighter">Transportation</h3>
              <div className="space-y-3 font-black">
                {['Jeepney', 'Bus', 'Van', 'Airplane', 'Boat', 'Tricycle', 'Habal-Habal', 'Others:'].map((type) => (
                  <div key={type} className="grid grid-cols-4 gap-4 items-center bg-[#f3f4f6] p-3 rounded-xl shadow-sm">
                    <span className="text-[10px] font-black text-gray-500 uppercase px-2">{type}</span>
                    <input className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none" placeholder="e.g., Daily 6AM-6PM" />
                    <input className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none" placeholder="e.g., Tagbilaran-Panglao" />
                    <input className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none" placeholder="e.g., ₱25" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INSTITUTIONAL */}
{activeTab === "Institutional" && (
  <div className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
    {/* ACCOMMODATION GROUPS */}
    <section className="space-y-6">
      <div className="flex justify-between items-center border-b pb-3 uppercase font-black tracking-tighter">
        <h3 className="text-sm font-black text-gray-800 uppercase">Accommodation and Other Facilities (Groups)</h3>
        <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black uppercase shadow-md transition-all active:scale-95"><Plus size={14}/> Add Group</button>
      </div>
      <div className="bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-400 text-[10px] font-black italic">No groups added yet.</div>
    </section>

    {/* LABOR FORCE SECTION */}
    <section className="space-y-6 pt-6 border-t font-black uppercase">
      <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Labor Force - Number of Employees</h3>
      {['Accommodation', 'Travel Agency', 'Restaurants', 'Land Transport', 'Sea Transport', 'Health and Wellness'].map((cat) => (
        <div key={cat} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-3 border-b border-gray-50">
          <span className="text-[11px] font-black text-gray-600 uppercase">{cat}</span>
          <div className="space-y-1 uppercase font-black"><label className="text-[8px] text-gray-400">Male</label><input className="w-full bg-[#f3f4f6] border-none rounded-lg px-3 py-2 text-[10px] font-black" placeholder="Amount" /></div>
          <div className="space-y-1 uppercase font-black"><label className="text-[8px] text-gray-400">Female</label><input className="w-full bg-[#f3f4f6] border-none rounded-lg px-3 py-2 text-[10px] font-black" placeholder="Amount" /></div>
        </div>
      ))}
    </section>

    {/* REVENUE SECTION - UPDATED TO MATCH YOUR SCREENSHOTS */}
    <section className="pt-10 border-t font-black uppercase">
      <h3 className="text-sm font-black text-gray-800 mb-8 border-b pb-3 uppercase tracking-tighter">Total Revenue Contributions to LGU (Past 3 Years)</h3>
      
      {['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers', 'MICE'].map((cat) => (
        <div key={cat} className="mb-8 font-black">
          {/* Label sits above the grid */}
          <span className="text-[10px] font-black text-gray-700 block mb-4 uppercase tracking-widest">{cat}</span>
          
          <div className="grid grid-cols-3 gap-6 uppercase font-black">
            <div className="space-y-1">
              <label className="text-[8px] text-gray-400 font-black">Year 1 (PhP)</label>
              <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 text-[10px] font-black shadow-sm" placeholder="Amount" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-gray-400 font-black">Year 2 (PhP)</label>
              <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 text-[10px] font-black shadow-sm" placeholder="Amount" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] text-gray-400 font-black">Year 3 (PhP)</label>
              <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 text-[10px] font-black shadow-sm" placeholder="Amount" />
            </div>
          </div>
        </div>
      ))}

      {/* EMERGENCY CONTACTS SECTION */}
      <div className="mt-12 border-t pt-8">
        <div className="flex justify-between items-center mb-6 uppercase">
          <h3 className="text-sm font-black text-gray-800">Emergency Contacts</h3>
          <button className="flex items-center gap-2 bg-[#2563eb] text-white px-6 py-2 rounded-lg text-xs font-black uppercase shadow-lg"><Plus size={14}/> Add Contact</button>
        </div>
      </div>
    </section>
  </div>
)}

         {/* TAB: SAFETY / HAZARD MATRIX */}
{activeTab === "Safety" && (
  <div className="space-y-12 animate-in fade-in duration-300 font-black uppercase">
    
    {/* 1. PEACE AND ORDER SECTION (image_ac59b2.png) */}
    <section className="space-y-6">
      <h3 className="text-sm font-black text-gray-800 border-b border-gray-100 pb-3 mb-6 uppercase">Peace and Order - Incidence of Crime</h3>
      <div className="space-y-2">
        {[
          "Kidnapping of Tourists", "Drowning of Tourists", "Petty theft involving local guides",
          "Road accidents involving tourists", "Prostitution/sexual harassment", "Use of prohibited drugs",
          "Pedophiles caught", "Masseurs got pregnant by tourist", "Trafficking of women and children",
          "Incidence of female tourists travelling alone", "Others:"
        ].map((crime) => (
          <div key={crime} className="flex justify-between items-center gap-10 p-2 border-b border-gray-50 font-black">
            <span className="text-[11px] font-black text-gray-600 w-1/3 uppercase">{crime}</span>
            <input 
              className="flex-1 bg-[#f3f4f6] border-none rounded-lg px-4 py-2 text-[10px] font-black outline-none focus:ring-1 focus:ring-orange-400" 
              placeholder="Description or notes" 
            />
          </div>
        ))}
      </div>
    </section>

    {/* 2. HAZARD MATRIX SECTION (image_ab70b9.png) */}
    <section className="pt-10 border-t border-gray-100 font-black uppercase">
      <h3 className="text-sm font-black text-gray-800 mb-6 uppercase tracking-tighter font-black">Hazard Matrix</h3>
      <div className="space-y-8 font-black">
        {['Earthquake', 'Landslide', 'Storm Surge', 'Tsunami', 'Others:'].map((hazard) => (
          <div key={hazard} className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4 shadow-sm uppercase font-black">
            <span className="font-black text-gray-800 text-[12px] tracking-widest border-b-2 border-gray-200 pb-1 inline-block uppercase">{hazard}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-black uppercase">
              <div className="space-y-1 font-black">
                <label className="text-[9px] font-black text-gray-400 uppercase">Location</label>
                <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-3 py-2 text-[10px] font-black" placeholder="Location affected" />
              </div>
              <div className="space-y-1 font-black">
                <label className="text-[9px] font-black text-gray-400 uppercase">No. of Population Affected</label>
                <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-3 py-2 text-[10px] font-black" placeholder="Population count" />
              </div>
              <div className="col-span-full space-y-1 font-black">
                <label className="text-[9px] font-black text-gray-400 uppercase">Tourist Attraction Location</label>
                <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-3 py-2 text-[10px] font-black" placeholder="Nearby tourist attraction" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 3. HAZARD MAPS SECTION (image_ac6082.png) */}
    <section className="pt-10 border-t border-gray-100 font-black uppercase">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-black text-gray-800 mb-4">Multiple-hazard Maps</h3>
        <label className="text-[10px] font-black text-gray-400 uppercase block mb-2">Upload Hazard Maps (can select multiple)</label>
        <input 
          type="file" 
          multiple
          className="block w-full text-[11px] font-black text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-[#f3f4f6] file:text-blue-700 hover:file:bg-blue-50" 
        />
      </div>
    </section>

    {/* 4. ADDITIONAL DIAGRAMS SECTION (image_ac6082.png) */}
    <section className="pt-10 font-black uppercase pb-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-black text-gray-800 mb-6 uppercase">Additional Diagrams & Charts</h3>
        
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase">Diagram Title</label>
            <input className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 text-[10px] font-black" placeholder="Enter diagram title" />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase">Upload Diagram/Chart</label>
            <div className="flex gap-4">
              <input 
                type="file" 
                className="flex-1 bg-[#f3f4f6] border-none rounded-lg px-4 py-1.5 text-[11px] font-black text-gray-500 file:hidden" 
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:bg-blue-700 transition-all uppercase shadow-md">
                <Upload size={14} /> Upload
              </button>
            </div>
            <p className="text-[8px] text-gray-400 mt-2 font-bold uppercase">Accepts: PNG, JPG, GIF, SVG</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Uploaded Diagrams (0)</h4>
          <div className="py-10 border border-dashed border-gray-100 rounded-xl">
             <p className="text-gray-300 text-[10px] italic font-black uppercase">No diagrams uploaded yet. Upload your first diagram above.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
)}
          {/* TAB: EDUCATION (image_ab7024.png) */}
          {activeTab === "Education" && (
            <div className="space-y-10 animate-in fade-in duration-300 font-black">
              <div className="flex justify-between items-center border-b pb-3 uppercase">
                <h3 className="text-sm font-black text-gray-800">Tourism Education</h3>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black uppercase"><Plus size={14}/> Add Training</button>
              </div>
              <div className="flex justify-between items-center border-b pb-3 pt-6 uppercase">
                <h3 className="text-sm font-black text-gray-800">Tourism Projects (Past 5 Years)</h3>
                <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-black uppercase"><Plus size={14}/> Add Project</button>
              </div>
              <div className="bg-[#f9fafb] border border-dashed border-gray-300 rounded-xl p-24 text-center text-gray-400 text-[11px] italic font-bold uppercase">Record institutional developments and training programs here.</div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}