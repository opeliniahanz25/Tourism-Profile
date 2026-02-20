import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Info, Users, MapPin, Building2, Bus, School, ShieldAlert } from "lucide-react";
import { Toaster, toast } from "sonner";
import backgroundImage from '../../assets/background.jpg';
import { initialProfileData, type ProfileData } from '../../data/profileData';

// --- TAB IMPORTS ---
import TabBasicInfo from './TabBasicInfo';
import TabOfficials from './TabOfficials';
import TabAttractions from './TabAttractions';
import TabAccomodation from './TabAccomodation'; 
import TabTransport from './TabTransport';
import TabInstitutional from './TabInstitutional';
import TabSafety from './TabSafety';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('profileData');
    if (saved) {
      try {
        setEditData(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing profile data:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(editData));
    toast.success('PROFILE CHANGES SAVED!', { 
      style: { background: '#00a859', color: '#fff' } 
    });
  };

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
    <div className="min-h-screen font-sans text-gray-900 pb-20 uppercase" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <Toaster position="top-right" richColors />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">P</div>
            <div>
              <h1 className="text-lg font-black leading-none text-gray-900 uppercase">ADMIN PANEL</h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">EDIT TOURISM PROFILE</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-black hover:bg-gray-50 uppercase shadow-sm">
              <ArrowLeft size={14} /> BACK
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-[#00a859] text-white rounded-lg text-xs font-black hover:bg-[#008f4c] shadow-md uppercase transition-all active:scale-95">
              <Save size={14} /> SAVE CHANGES
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex bg-gray-200/60 p-1 rounded-xl mb-8 overflow-x-auto no-scrollbar shadow-inner border border-gray-200 font-black">
          {tabs.map((tab) => (
            <button 
              key={tab.name} 
              onClick={() => setActiveTab(tab.name)} 
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[11px] font-black transition-all uppercase whitespace-nowrap ${activeTab === tab.name ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 min-h-[600px] uppercase font-black">
          {activeTab === "Basic Info" && <TabBasicInfo editData={editData} setEditData={setEditData} />}
          {activeTab === "Officials" && <TabOfficials editData={editData} setEditData={setEditData} />}
          {activeTab === "Attractions" && <TabAttractions editData={editData} setEditData={setEditData} />}
          {activeTab === "Accommodation" && <TabAccomodation editData={editData} setEditData={setEditData} />}
          {activeTab === "Transport" && <TabTransport editData={editData} setEditData={setEditData} />}
          {activeTab === "Institutional" && <TabInstitutional editData={editData} setEditData={setEditData} />}
          {activeTab === "Safety" && <TabSafety editData={editData} setEditData={setEditData} />}
        </div>
      </main>
    </div>
  );
}