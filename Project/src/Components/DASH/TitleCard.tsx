import shesh from '../../../public/assets/shesh.png'; 
import LOGOpanglao from '../../../public/assets/LOGOpanglao.png';

export default function TitleCard() {
  return (
    <div className="bg-white/60 backdrop-blur-3xl border border-white/60 rounded-2xl p-10 text-center shadow-2xl relative overflow-hidden">
      {/* Decorative Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>

      <div className="flex justify-between items-center mb-8">
        {/* Left Logo (Panglao Seal) */}
        <img src={shesh} alt="Panglao Seal" className="h-28 w-auto drop-shadow-2xl transition-transform hover:scale-105 duration-300" />

        {/* Center Text Headers */}
        <div className="text-center flex-1 mx-4">
          <p className="text-gray-600 text-[10px] font-black tracking-[0.4em] mb-1 uppercase opacity-80">Republic of the Philippines</p>
          <p className="text-gray-600 text-[10px] font-black tracking-[0.4em] mb-2 uppercase opacity-80">Province of Bohol</p>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter drop-shadow-sm">
            Municipality of Panglao
          </h2>
        </div>

        {/* Right Logo (Behold Bohol) */}
        <img src={LOGOpanglao} alt="Behold Bohol" className="h-28 w-auto drop-shadow-2xl transition-transform hover:scale-105 duration-300" />
      </div>

      {/* Office Branding */}
      <h3 className="text-blue-700 font-black text-xs tracking-[0.5em] mb-8 uppercase drop-shadow-sm">
        Office of the Municipal Tourism Officer
      </h3>

      {/* Main Title Banner - Inset Glass Effect */}
      <div className="bg-white/5 py-8 px-10 rounded-3xl border border-white/20 shadow-inner backdrop-blur-md">
        <h4 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none drop-shadow-md">
          Panglao Local Tourism Industry Profile
        </h4>
      </div>
    </div>
  );
}