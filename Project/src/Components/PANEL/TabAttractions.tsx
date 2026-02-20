import * as React from "react";
import { Plus, Trash2, Image as ImageIcon, Upload, TableProperties } from "lucide-react";

export default function TabAttractions({ editData, setEditData }: { editData: any, setEditData: any }) {
  
  // Helper to get current assets safely
  const currentAssets = editData.tourismAssets || { attractions: [], tourismMap: "" };

  const updateAttraction = (index: number, field: string, value: string) => {
    const newList = [...(currentAssets.attractions || [])];
    newList[index] = { ...newList[index], [field]: value.toUpperCase() };
    
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, attractions: newList } 
    });
  };

  const addRow = () => {
    const newList = [...(currentAssets.attractions || []), { category: "", name: "", location: "", activities: "" }];
    setEditData({
      ...editData,
      tourismAssets: { ...currentAssets, attractions: newList }
    });
  };

  const removeRow = (index: number) => {
    const newList = [...(currentAssets.attractions || [])];
    newList.splice(index, 1);
    setEditData({ 
      ...editData, 
      tourismAssets: { ...currentAssets, attractions: newList } 
    });
  };

  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ 
          ...editData, 
          tourismAssets: { ...currentAssets, tourismMap: reader.result as string } 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-gray-800 uppercase flex items-center gap-2">
            <TableProperties size={18} className="text-cyan-600"/> A. Attractions Manager
          </h3>
          <button onClick={addRow} className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase shadow-md active:scale-95 transition-all">
            <Plus size={14} /> Add Row
          </button>
        </div>

        <div className="space-y-2">
          {currentAssets.attractions?.map((item: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <input className="col-span-2 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.category || ""} onChange={(e) => updateAttraction(index, 'category', e.target.value)} placeholder="CATEGORY" />
              <input className="col-span-3 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.name || ""} onChange={(e) => updateAttraction(index, 'name', e.target.value)} placeholder="NAME" />
              <input className="col-span-3 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none" 
                     value={item.location || ""} onChange={(e) => updateAttraction(index, 'location', e.target.value)} placeholder="LOCATION" />
              <textarea rows={1} className="col-span-3 bg-white border border-gray-300 rounded p-2 text-[10px] uppercase font-black outline-none resize-none" 
                        value={item.activities || ""} onChange={(e) => updateAttraction(index, 'activities', e.target.value)} placeholder="ACTIVITIES" />
              <button onClick={() => removeRow(index)} className="col-span-1 flex justify-center items-center text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
        <h3 className="text-sm font-black text-gray-800 uppercase mb-4 flex items-center gap-2 justify-center">
          <ImageIcon size={18} className="text-cyan-600" /> B. Local Tourism Map
        </h3>
        <label className="cursor-pointer flex items-center gap-3 bg-gray-800 hover:bg-black text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg mx-auto w-fit">
          <Upload size={16} /> {currentAssets.tourismMap ? "Change Map Image" : "Upload Map Image"}
          <input type="file" className="hidden" accept="image/*" onChange={handleMapUpload} />
        </label>
        {currentAssets.tourismMap && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-[9px] text-green-600 font-bold uppercase mb-2">✓ Image Loaded</p>
            <img src={currentAssets.tourismMap} className="h-20 w-auto rounded border shadow-sm" alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
}