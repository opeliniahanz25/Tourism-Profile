import { useRef } from 'react';
import { Toaster, toast } from "sonner";
import html2pdf from 'jspdf-html2canvas';

import DashboardHeader from './DashboardHeader';
import TitleCard from './TitleCard';
import BasicInfo from './BasicInfo';
import Officials from './Officials';
import TourismAssets from './TourismAssets';
import Transportation from './Transportation';
import InstitutionalElements from './InstitutionalElements';
import Safety from './Safety'; // IMPORTED HERE

import backgroundImage from '../../../public/assets/Background.jpg';
import { type ProfileData } from '../../data/profileData';

interface AdminDashboardProps {
  profileData: ProfileData;
}

export default function AdminDashboard({ profileData }: AdminDashboardProps) {
  const mainContentRef = useRef<HTMLElement>(null);

  const handleSaveToPC = async () => {
    if (!mainContentRef.current) return;
    const loadingToast = toast.loading("PREPARING PDF...");
    
    try {
      await html2pdf(mainContentRef.current, {
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          backgroundColor: '#ffffff' 
        },
        output: `LGU_PROFILE_${profileData.basicInfo.name || 'PANGLAO'}.pdf`,
      });
      toast.dismiss(loadingToast);
      toast.success("PDF DOWNLOADED!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("EXPORT FAILED");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans uppercase" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundAttachment: 'fixed' 
      }}
    >
      <Toaster position="top-center" richColors />
      <DashboardHeader onPrint={handleSaveToPC} />

      <main 
        ref={mainContentRef} 
        className="max-w-5xl w-full mx-auto p-8 space-y-10 grow my-10 rounded-2xl "
      >
        <TitleCard />
        <BasicInfo data={profileData.basicInfo} />
        <Officials data={profileData.officials} />
        <TourismAssets data={profileData.tourismAssets} /> 
        <Transportation data={profileData.transportation} />
        <InstitutionalElements data={profileData} />
        {/* SAFETY COMPONENT ADDED TO THE BOTTOM OF THE LIST */}
        <Safety data={profileData} />
      </main>

      <footer className="py-10 bg-[#1e293b] text-center text-white text-[11px] font-black tracking-widest">
        © {new Date().getFullYear()} Municipality of Panglao - Office of the Municipal Tourism Officer {profileData.basicInfo.name || 'PANGLAO'}
        <div className="text-gray-500"> Republic of the Philippines | Province of Bohol</div>
      </footer>
    </div>
  );
}