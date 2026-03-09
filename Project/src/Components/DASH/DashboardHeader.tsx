import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Save, Check } from "lucide-react";
import shesh from '../../../public/assets/shesh.png'; 

export default function DashboardHeader({ onPrint }: { onPrint?: () => void }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSaveClick = () => {
    if (onPrint) {
      setIsSaving(true);
      onPrint(); // Calls window.print() in the parent component
      
      // Feedback duration
      setTimeout(() => {
        setIsSaving(false);
      }, 3000);
    }
  };

  return (
    <header className="bg-white/20 backdrop-blur-2xl border-b border-white/30 sticky top-0 z-50 p-4 shadow-lg no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={shesh} alt="Logo" className="h-14 w-auto drop-shadow-md" />
          <div>
            <h1 className="text-xl font-black text-blue-800 leading-none uppercase drop-shadow-sm">Municipality of Panglao</h1>
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-tight">Office of the Municipal Tourism Officer</p>
          </div>
        </div>
        <div className="flex gap-3">
          
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/40 rounded-lg text-xs font-black hover:bg-white/30 transition-all uppercase backdrop-blur-md"
          >
            <ArrowLeft size={14} /> Logout
          </button>
          
          <button 
            onClick={() => navigate('/admin-panel')} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 text-white rounded-lg text-xs font-black hover:bg-blue-600 transition-all uppercase shadow-md backdrop-blur-md"
          >
            <Lock size={14} /> Admin Panel
          </button>

          {/* SAVE TO PDF BUTTON */}
          <button 
            onClick={handleSaveClick} 
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all uppercase shadow-md active:scale-95 backdrop-blur-md ${
              isSaving 
              ? "bg-green-600/80 text-white cursor-default" 
              : "bg-red-600/80 text-white hover:bg-red-600"
            }`}
          >
            {isSaving ? <Check size={14} /> : <Save size={14} />}
            {isSaving ? "Saving..." : "Save to PDF"}
          </button>

        </div>
      </div>
    </header>
  );
}