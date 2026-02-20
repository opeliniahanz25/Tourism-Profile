import * as React from "react";
import { type ProfileData } from '../../data/profileData';

export default function TabOfficials({ editData, setEditData }: { editData: ProfileData, setEditData: any }) {
  const updateOfficial = (field: string, value: string, index?: number) => {
    if (field === 'council' && typeof index === 'number') {
      const newCouncil = [...editData.officials.council];
      newCouncil[index] = value;
      setEditData({ ...editData, officials: { ...editData.officials, council: newCouncil } });
    } else {
      setEditData({ ...editData, officials: { ...editData.officials, [field]: value } });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h3 className="text-sm font-black text-gray-800 uppercase border-b pb-2">EDIT GOVERNMENT OFFICIALS</h3>
      <div className="space-y-4 max-w-4xl">
        {['mayor', 'viceMayor', 'tourismOfficer', 'planningCoordinator'].map((field) => (
          <div key={field} className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input className="w-full bg-[#f3f4f6] rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase" 
                   value={(editData.officials as any)[field]} 
                   onChange={(e) => updateOfficial(field, e.target.value.toUpperCase())} />
          </div>
        ))}
        <div className="pt-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">SANGGUNIANG BAYAN MEMBERS</label>
          <div className="grid grid-cols-2 gap-4">
            {editData.officials.council.map((name, i) => (
              <input key={i} className="w-full bg-[#f3f4f6] rounded-lg px-4 py-2 font-black text-gray-700 text-[11px] uppercase focus:ring-1 focus:ring-blue-400 outline-none" 
                     value={name} onChange={(e) => updateOfficial('council', e.target.value.toUpperCase(), i)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}