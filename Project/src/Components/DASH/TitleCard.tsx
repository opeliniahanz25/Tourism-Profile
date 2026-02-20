import shesh from '../../../public/assets/shesh.png'; 
import LOGOpanglao from '../../../public/assets/LOGOpanglao.png';

export default function TitleCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm relative overflow-hidden">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-100"></div>

      <div className="flex justify-between items-center mb-6">
        {/* Left Logo (Panglao Seal) */}
        <img src={shesh} alt="Panglao Seal" className="h-24 w-auto drop-shadow-sm" />

        {/* Center Text Headers */}
        <div className="text-center flex-1 mx-4">
          <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] mb-1 uppercase">Republic of the Philippines</p>
          <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] mb-1 uppercase">Province of Bohol</p>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Municipality of Panglao</h2>
        </div>

        {/* Right Logo (Behold Bohol) */}
        <img src={LOGOpanglao} alt="Behold Bohol" className="h-24 w-auto drop-shadow-sm" />
      </div>

      {/* Office Branding */}
      <h3 className="text-blue-600 font-black text-xs tracking-[0.3em] mb-6 uppercase">
        Office of the Municipal Tourism Officer
      </h3>

      {/* Main Title Banner */}
      <div className="bg-gray-50 py-6 px-10 rounded-2xl border border-gray-100 shadow-inner">
        <h4 className="text-3xl font-black text-gray-800 tracking-tighter uppercase leading-none">
          Panglao Local Tourism Industry Profile
        </h4>
      </div>
    </div>
  );
}