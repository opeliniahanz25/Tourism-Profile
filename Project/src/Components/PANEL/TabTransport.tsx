import { type ProfileData } from '../../data/profileData';

export default function TabTransport({ editData, setEditData }: { editData: ProfileData, setEditData: any }) {
  const types = ['JEEPNEY', 'BUS', 'VAN', 'AIRPLANE', 'BOAT', 'TRICYCLE', 'HABAL-HABAL', 'OTHERS:'];

  const updateTransport = (type: string, field: string, value: string) => {
    // 1. Ensure we are working with an array
    const currentList = Array.isArray(editData.transportation) ? [...editData.transportation] : [];
    
    // 2. Find index using case-insensitive comparison
    const index = currentList.findIndex(item => item.type?.toUpperCase() === type.toUpperCase());

    if (index > -1) {
      // Update existing
      currentList[index] = { 
        ...currentList[index], 
        [field]: value // Removed toUpperCase here to prevent cursor jumping
      };
    } else {
      // Add new
      currentList.push({ type, [field]: value });
    }

    // 3. Update state
    setEditData({ ...editData, transportation: currentList });
  };

  const getVal = (type: string, field: string) => {
    if (!Array.isArray(editData.transportation)) return "";
    const item = editData.transportation.find(d => d.type?.toUpperCase() === type.toUpperCase());
    return item ? item[field] : "";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-black">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter">
          TRANSPORTATION LOGISTICS
        </h3>
        <span className="text-[9px] text-blue-500 bg-blue-50 px-2 py-1 rounded">AUTO-FORMATTING ACTIVE</span>
      </div>

      <div className="space-y-3">
        {types.map((type) => (
          <div key={type} className="grid grid-cols-4 gap-4 items-center bg-[#f3f4f6] p-3 rounded-xl border border-gray-100 transition-all hover:border-blue-200">
            <span className="text-[10px] font-black text-gray-500 uppercase px-2">{type}</span>
            
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="SCHEDULES" 
              value={getVal(type, 'schedule')}
              onChange={(e) => updateTransport(type, 'schedule', e.target.value)}
            />
            
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="ROUTE" 
              value={getVal(type, 'route')}
              onChange={(e) => updateTransport(type, 'route', e.target.value)}
            />
            
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="FARE" 
              value={getVal(type, 'fare')}
              onChange={(e) => updateTransport(type, 'fare', e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}