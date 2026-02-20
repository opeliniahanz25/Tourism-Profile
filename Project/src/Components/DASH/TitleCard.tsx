
import shesh from '../../assets/shesh.png'; 

export default function TitleCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-100"></div>
      <div className="flex justify-between items-start mb-4">
        <img src={shesh} alt="Logo" className="h-20 w-auto" />
        <div className="text-center">
          <p className="text-gray-500 text-[10px] font-bold tracking-widest mb-1 uppercase">Republic of the Philippines</p>
          <p className="text-gray-500 text-[10px] font-bold tracking-widest mb-1 uppercase">Province of Bohol</p>
          <h2 className="text-xl font-black text-gray-900 uppercase">Municipality of Panglao</h2>
        </div>
        <div className="h-20 w-20 flex items-center justify-center italic text-gray-300 text-xs border border-dashed border-gray-200 p-2 font-black leading-tight uppercase">Behold Bohol</div>
      </div>
      <h3 className="text-blue-500 font-black text-xs tracking-[0.2em] mb-4 uppercase">Office of the Municipal Tourism Officer</h3>
      <div className="bg-gray-100 py-4 px-8 rounded-lg">
        <h4 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">Panglao Local Tourism Industry Profile</h4>
      </div>
    </div>
  );
}