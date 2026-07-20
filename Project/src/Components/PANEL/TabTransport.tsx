import { Plus, Trash2 } from "lucide-react";
import { type ProfileData } from '../../data/profileData';
import { useEffect, useRef } from "react";

export default function TabTransport({ editData, setEditData }: { editData: ProfileData, setEditData: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultTypes = ['JEEPNEY', 'BUS', 'VAN', 'AIRPLANE', 'BOAT', 'TRICYCLE', 'HABAL-HABAL'];

  // FIX: Access the list property correctly
  const currentTransports = Array.isArray(editData.transportation?.list) ? editData.transportation.list : [];
  
  const customTypes = currentTransports
    .filter(item => item.type && !defaultTypes.includes(item.type.toUpperCase()))
    .map(item => item.type.toUpperCase());
  
  const allTypes = [...defaultTypes, ...customTypes];

  useEffect(() => {
    if (containerRef.current) {
      const textareas = containerRef.current.querySelectorAll('textarea');
      textareas.forEach((textarea: any) => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }
  }, [editData.transportation]);

  const autoResize = (e: any) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const updateTransport = (type: string, field: string, value: string) => {
    const currentList = [...currentTransports];
    const index = currentList.findIndex(item => item.type?.toUpperCase() === type.toUpperCase());

    if (index > -1) {
      currentList[index] = { ...currentList[index], [field]: value.toUpperCase() };
    } else {
      currentList.push({ type: type.toUpperCase(), [field]: value.toUpperCase() });
    }
    // FIX: Maintain the { list: [] } structure
    setEditData({ ...editData, transportation: { ...editData.transportation, list: currentList } });
  };

  const addCustomTransport = () => {
    const newType = prompt("ENTER TRANSPORTATION TYPE (E.G. SPEEDBOAT, BICYCLE):");
    if (newType && !allTypes.includes(newType.toUpperCase())) {
      const currentList = [...currentTransports];
      currentList.push({ type: newType.toUpperCase(), schedule: '', route: '', fare: '' });
      setEditData({ ...editData, transportation: { ...editData.transportation, list: currentList } });
    }
  };

  const removeTransport = (type: string) => {
    const currentList = currentTransports.filter(item => item.type?.toUpperCase() !== type.toUpperCase());
    setEditData({ ...editData, transportation: { ...editData.transportation, list: currentList } });
  };

  const getVal = (type: string, field: string) => {
    const item = currentTransports.find(d => d.type?.toUpperCase() === type.toUpperCase());
    return item ? item[field] : "";
  };

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in duration-300 font-black">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter">
          TRANSPORTATION LOGISTICS
        </h3>
        <button 
          onClick={addCustomTransport}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-blue-700 transition-all shadow-sm active:scale-95"
        >
          <Plus size={14} /> ADD TRANSPORT
        </button>
      </div>

      <div className="space-y-3">
        {allTypes.map((type) => (
          <div key={type} className="grid grid-cols-12 gap-3 items-start bg-[#f3f4f6] p-3 rounded-xl border border-gray-100 transition-all hover:border-blue-200">
            <div className="col-span-3 flex items-center gap-2 py-2">
              {!defaultTypes.includes(type) && (
                <button 
                  onClick={() => removeTransport(type)} 
                  className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                >
                  <Trash2 size={12}/>
                </button>
              )}
              <span className="text-[10px] font-black text-gray-500 uppercase">{type}</span>
            </div>
            
            <textarea 
              className="col-span-3 bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 resize-none overflow-hidden min-h-8.75" 
              placeholder="SCHEDULES" 
              rows={1}
              onInput={autoResize}
              value={getVal(type, 'schedule')}
              onChange={(e) => updateTransport(type, 'schedule', e.target.value)}
            />
            
            <textarea 
              className="col-span-3 bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 resize-none overflow-hidden min-h-8.75" 
              placeholder="ROUTE" 
              rows={1}
              onInput={autoResize}
              value={getVal(type, 'route')}
              onChange={(e) => updateTransport(type, 'route', e.target.value)}
            />
            
            <textarea 
              className="col-span-3 bg-white rounded-lg px-3 py-2 text-[10px] font-black outline-none border border-transparent focus:border-blue-400 resize-none overflow-hidden min-h-8.75" 
              placeholder="FARE" 
              rows={1}
              onInput={autoResize}
              value={getVal(type, 'fare')}
              onChange={(e) => updateTransport(type, 'fare', e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}