
import { Plus, Trash2, Building2, TableProperties } from "lucide-react";

export default function TabAccomodation({ editData, setEditData }: { editData: any, setEditData: any }) {
  
  // Helper to target the correct folder in your state
  const currentAssets = editData.tourismAssets || {};
  const accommodations = currentAssets.accommodations || [];
  const facilities = currentAssets.facilities || [];

  // --- SECTION C: ACCOMMODATIONS ---
  const updateAccom = (index: number, field: string, value: string) => {
    const newList = [...accommodations];
    newList[index] = { ...newList[index], [field]: value.toUpperCase() };
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, accommodations: newList } 
    });
  };

  const addAccomRow = () => {
    const newList = [...accommodations, { name: "", rooms: "", capacity: "", location: "" }];
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, accommodations: newList } 
    });
  };

  const removeAccomRow = (index: number) => {
    const newList = [...accommodations];
    newList.splice(index, 1);
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, accommodations: newList } 
    });
  };

  // --- SECTION D: OTHER FACILITIES ---
  const updateFacility = (index: number, field: string, value: string) => {
    const newList = [...facilities];
    newList[index] = { ...newList[index], [field]: value.toUpperCase() };
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, facilities: newList } 
    });
  };

  const addFacilityRow = () => {
    const newList = [...facilities, { type: "", name: "", location: "" }];
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, facilities: newList } 
    });
  };

  const removeFacilityRow = (index: number) => {
    const newList = [...facilities];
    newList.splice(index, 1);
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, facilities: newList } 
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 font-black">
      
      {/* SECTION C: ACCOMMODATIONS EDITOR */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2">
            <Building2 size={18} className="text-blue-600"/> C. Accommodation Facilities
          </h3>
          <button onClick={addAccomRow} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase shadow-md active:scale-95 transition-all">
            <Plus size={14} /> Add Accommodation
          </button>
        </div>

        <div className="space-y-2">
          {accommodations.map((item: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <input className="col-span-4 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.name || ""} onChange={(e) => updateAccom(index, 'name', e.target.value)} placeholder="ESTABLISHMENT NAME" />
              <input className="col-span-2 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none text-center" 
                     value={item.rooms || ""} onChange={(e) => updateAccom(index, 'rooms', e.target.value)} placeholder="ROOMS" />
              <input className="col-span-2 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none text-center" 
                     value={item.capacity || ""} onChange={(e) => updateAccom(index, 'capacity', e.target.value)} placeholder="CAPACITY" />
              <input className="col-span-3 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.location || ""} onChange={(e) => updateAccom(index, 'location', e.target.value)} placeholder="LOCATION" />
              <button onClick={() => removeAccomRow(index)} className="col-span-1 flex justify-center items-center text-red-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: OTHER FACILITIES EDITOR */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2">
            <TableProperties size={18} className="text-blue-600"/> D. Other Tourism-Related Facilities
          </h3>
          <button onClick={addFacilityRow} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase shadow-md active:scale-95 transition-all">
            <Plus size={14} /> Add Facility
          </button>
        </div>

        <div className="space-y-2">
          {facilities.map((item: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <input className="col-span-3 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.type || ""} onChange={(e) => updateFacility(index, 'type', e.target.value)} placeholder="FACILITY TYPE" />
              <input className="col-span-4 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.name || ""} onChange={(e) => updateFacility(index, 'name', e.target.value)} placeholder="NAME / DESCRIPTION" />
              <input className="col-span-4 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.location || ""} onChange={(e) => updateFacility(index, 'location', e.target.value)} placeholder="LOCATION" />
              <button onClick={() => removeFacilityRow(index)} className="col-span-1 flex justify-center items-center text-red-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}