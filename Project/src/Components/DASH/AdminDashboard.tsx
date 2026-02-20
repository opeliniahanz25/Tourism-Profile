import { useState, useEffect } from 'react';
import { Toaster } from "sonner";

// Import Partials from the same folder
import DashboardHeader from './DashboardHeader';
import TitleCard from './TitleCard';
import BasicInfo from './BasicInfo';
import Officials from './Officials';
import TourismAssets from './TourismAssets';
import Transportation from './Transportation';
import InstitutionalElements from './InstitutionalElements';

// Assets - FIXED PATH
import backgroundImage from '/Background.jpg';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function AdminDashboard() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  useEffect(() => {
    // 1. Initial Load from LocalStorage
    const loadData = () => {
      const savedData = localStorage.getItem('tourism_data') || localStorage.getItem('profileData');
      if (savedData) {
        try {
          setProfileData(JSON.parse(savedData));
        } catch (e) {
          console.error("Failed to parse profileData", e);
        }
      }
    };

    loadData();

    // 2. Added Listener: This makes the dashboard update INSTANTLY when you save in the other tab
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

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
      <Toaster position="top-center" richColors />
      
      <DashboardHeader />

      <main className="max-w-5xl mx-auto p-8 space-y-10 uppercase">
        <TitleCard />
        <BasicInfo data={profileData.basicInfo} />
        <Officials data={profileData.officials} />
        <TourismAssets data={profileData.tourismAssets} /> 
        <Transportation data={profileData.transportation} />
        
        {/* ADDED FIX: Passing profileData directly so it can access institutionalFacilities, laborForce, etc. */}
        <InstitutionalElements data={profileData} />
      </main>

      <footer className="py-10 bg-[#1e293b] text-center border-t border-gray-200 mt-10">
        <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-2">
          © 2026 Municipality of Panglao - Office of the Municipal Tourism Officer
        </p>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest">
          Republic of the Philippines | Province of Bohol
        </p>
      </footer>
    </div>
  );
}