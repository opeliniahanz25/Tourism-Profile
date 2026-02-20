import * as React from "react";
import { type ProfileData } from '../../data/profileData';

export default function TabTransport({ editData, setEditData }: { editData: ProfileData, setEditData: any }) {
  const types = ['JEEPNEY', 'BUS', 'VAN', 'AIRPLANE', 'BOAT', 'TRICYCLE', 'HABAL-HABAL', 'OTHERS:'];

  const updateTransport = (type: string, field: string, value: string) => {
    // Ensure transportation exists as an array
    const currentList = [...(editData.transportation || [])];
    const index = currentList.findIndex(item => item.type === type);

    if (index > -1) {
      // Update existing type
      currentList[index] = { ...currentList[index], [field]: value.toUpperCase() };
    } else {
      // Add new type entry
      currentList.push({ type, [field]: value.toUpperCase() });
    }

    setEditData({ ...editData, transportation: currentList });
  };

  const getVal = (type: string, field: string) => {
    const item = editData.transportation?.find(d => d.type === type);
    return item ? item[field] : "";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-black">
      <h3 className="text-sm font-black text-gray-800 border-b pb-3 uppercase tracking-tighter">TRANSPORTATION LOGISTICS</h3>
      <div className="space-y-3">
        {types.map((type) => (
          <div key={type} className="grid grid-cols-4 gap-4 items-center bg-[#f3f4f6] p-3 rounded-xl border border-gray-100">
            <span className="text-[10px] font-black text-gray-500 uppercase px-2">{type}</span>
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400" 
              placeholder="SCHEDULES" 
              value={getVal(type, 'schedule')}
              onChange={(e) => updateTransport(type, 'schedule', e.target.value)}
            />
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400" 
              placeholder="ROUTE" 
              value={getVal(type, 'route')}
              onChange={(e) => updateTransport(type, 'route', e.target.value)}
            />
            <input 
              className="bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400" 
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