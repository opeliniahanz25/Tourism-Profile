import { type ProfileData } from '../../data/profileData';

export default function TabOfficials({ editData, setEditData }: { editData: ProfileData, setEditData: any }) {
  
  const updateOfficial = (field: string, value: string, index?: number) => {
    const updatedOfficials = { ...editData.officials };

    if (field === 'council' && typeof index === 'number') {
      // Ensure we have an array of 10
      const currentList = Array.isArray(updatedOfficials.council) 
        ? [...updatedOfficials.council] 
        : Array(10).fill("");
      
      while (currentList.length < 10) currentList.push("");
      
      currentList[index] = value;
      updatedOfficials.council = currentList;
    } else {
      (updatedOfficials as any)[field] = value;
    }

    setEditData({ 
      ...editData, 
      officials: updatedOfficials 
    });
  };

  // Ensure we always display 10 inputs
  const councilList = Array.isArray(editData.officials?.council) ? editData.officials.council : [];
  const sbSlots = Array(10).fill("").map((_, i) => councilList[i] || "");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-black">
      <h3 className="text-sm font-black text-gray-800 uppercase border-b pb-2 italic">EDIT GOVERNMENT OFFICIALS</h3>
      
      <div className="space-y-4 max-w-4xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {[
            { id: 'mayor', label: 'MAYOR' },
            { id: 'viceMayor', label: 'VICE MAYOR' },
            { id: 'tourismOfficer', label: 'TOURISM OFFICER' },
            { id: 'planningCoordinator', label: 'PLANNING COORDINATOR' }
          ].map((item) => (
            <div key={item.id} className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase">
                {item.label}
              </label>
              <input 
                className="w-full bg-[#f3f4f6] rounded-lg px-4 py-2 font-black text-gray-700 outline-none uppercase border border-transparent focus:border-blue-500 transition-all" 
                value={(editData.officials as any)[item.id] || ""} 
                onChange={(e) => updateOfficial(item.id, e.target.value.toUpperCase())} 
              />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4">
            SANGGUNIANG BAYAN MEMBERS (10 HOLDERS)
          </label>
          <div className="grid grid-cols-2 gap-4">
            {sbSlots.map((name, i) => (
              <input 
                key={`sb-${i}`} 
                className="w-full bg-[#f3f4f6] rounded-lg px-4 py-2 font-black text-gray-700 text-[11px] uppercase focus:ring-1 focus:ring-blue-400 outline-none border border-transparent" 
                value={name} 
                placeholder={`MEMBER ${i + 1}`}
                onChange={(e) => updateOfficial('council', e.target.value.toUpperCase(), i)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}