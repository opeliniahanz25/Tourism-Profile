
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from "lucide-react";
import shesh from '../../assets/shesh.png'; 

export default function DashboardHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-white border-b-4 border-blue-600 sticky top-0 z-50 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={shesh} alt="Logo" className="h-14 w-auto" />
          <div>
            <h1 className="text-xl font-black text-blue-700 leading-none uppercase">Municipality of Panglao</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Office of the Municipal Tourism Officer</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-black hover:bg-gray-50 transition-all uppercase">
            <ArrowLeft size={14} /> Logout
          </button>
          <button onClick={() => navigate('/admin-panel')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all uppercase shadow-md">
            <Lock size={14} /> Admin Panel
          </button>
        </div>
      </div>
    </header>
  );
}