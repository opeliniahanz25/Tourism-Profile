import { useState, useEffect } from 'react';
import { Toaster } from "sonner";

// Partials
import DashboardHeader from './DashboardHeader';
import TitleCard from './TitleCard';
import BasicInfo from './BasicInfo';
import Officials from './Officials';
import TourismAssets from './TourismAssets';
import Transportation from './Transportation';
import InstitutionalElements from './InstitutionalElements';

// Assets
import backgroundImage from '../../../public/assets/Background.jpg';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function AdminDashboard() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem('tourism_data');
      if (savedData) {
        try {
          setProfileData(JSON.parse(savedData));
        } catch (e) {
          console.error("Failed to parse profileData", e);
        }
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  return (
    /* 1. Added flex and flex-col to the wrapper */
    <div 
      className="min-h-screen flex flex-col font-sans text-gray-900 uppercase"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Toaster position="top-center" richColors />
      <DashboardHeader />

      {/* 2. Added flex-grow so this section expands to fill empty space */}
      <main className="max-w-5xl w-full mx-auto p-8 space-y-10 grow">
        <TitleCard />
        
        <BasicInfo data={profileData.basicInfo} />
        <Officials data={profileData.officials} />
        <TourismAssets data={profileData.tourismAssets} /> 
        <Transportation data={profileData.transportation} />
        
        <InstitutionalElements data={profileData} />
      </main>

      {/* 3. Footer now stays at the bottom naturally */}
      <footer className="py-10 bg-[#1e293b] text-center border-t border-gray-200">
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