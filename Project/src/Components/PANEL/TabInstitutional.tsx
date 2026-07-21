import { Plus, Trash2, Building2, Users, CalendarPlus, CalendarX } from "lucide-react";
import TabInstitutionalSupport from "./TabInstitutionalSupport";

export default function TabInstitutional({ editData, setEditData }: { editData: any, setEditData: any }) {
  
  const instData = editData.institutional || {};
  const revenueYears: string[] = instData.revenueYears || ['y1', 'y2', 'y3'];

  const updateNestedData = (section: string, category: string, field: string, value: string) => {
    setEditData({
      ...editData,
      institutional: {
        ...instData,
        [section]: {
          ...instData[section],
          [category]: {
            ...instData[section]?.[category],
            [field]: value.toUpperCase()
          }
        }
      }
    });
  };

  const updateArrayItem = (section: string, index: number, field: string, value: string) => {
    const newList = [...(instData[section] || [])];
    newList[index] = { ...newList[index], [field]: value.toUpperCase() };
    setEditData({ 
      ...editData, 
      institutional: { ...instData, [section]: newList } 
    });
  };

  const addArrayItem = (section: string, defaultObj: any) => {
    setEditData({ 
      ...editData, 
      institutional: { ...instData, [section]: [...(instData[section] || []), defaultObj] } 
    });
  };

  const removeArrayItem = (section: string, index: number) => {
    const newList = [...(instData[section] || [])];
    newList.splice(index, 1);
    setEditData({ 
      ...editData, 
      institutional: { ...instData, [section]: newList } 
    });
  };

  const addRevenueYear = () => {
    const nextYearKey = `y${revenueYears.length + 1}`;
    setEditData({ 
      ...editData, 
      institutional: { ...instData, revenueYears: [...revenueYears, nextYearKey] } 
    });
  };

  const removeRevenueYear = () => {
    if (revenueYears.length <= 1) return;
    setEditData({ 
      ...editData, 
      institutional: { ...instData, revenueYears: revenueYears.slice(0, -1) } 
    });
  };

  const laborCategories = ['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers'];
  const revenueCategories = [...laborCategories, 'MICE'];



  return (
    <div className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3 border-blue-100">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Building2 size={16}/> A. Institutional Facilities</h3>
          <button onClick={() => addArrayItem('institutionalFacilities', { group: '', role: '', name: '', contact: '' })} 
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded text-[10px]">
            <Plus size={12}/> Add Group
          </button>
        </div>
        <div className="space-y-2">
          {instData.institutionalFacilities?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200">
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="GROUP" value={item.group || ""} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'group', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="ROLE" value={item.role || ""} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'role', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="NAME/HEAD" value={item.name || ""} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'name', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="CONTACT" value={item.contact || ""} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'contact', e.target.value)} />
              <button onClick={() => removeArrayItem('institutionalFacilities', i)} className="col-span-1 text-red-500 flex justify-center hover:bg-red-50 rounded transition-colors"><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Users size={16}/> F. Labor Force (Employees)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {laborCategories.map((cat) => (
            <div key={cat} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-[9px] block mb-2 text-gray-500">{cat}</span>
              <div className="grid grid-cols-2 gap-2">
                <input className="p-2 text-[10px] border rounded bg-white font-black" placeholder="MALE" value={instData.laborForce?.[cat]?.male || ""} onChange={(e) => updateNestedData('laborForce', cat, 'male', e.target.value)} />
                <input className="p-2 text-[10px] border rounded bg-white font-black" placeholder="FEMALE" value={instData.laborForce?.[cat]?.female || ""} onChange={(e) => updateNestedData('laborForce', cat, 'female', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-blue-600">B. Revenue Contributions</h3>
          <div className="flex gap-2">
            <button onClick={removeRevenueYear} className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded text-[10px] font-black hover:bg-red-100 transition-colors">
              <CalendarX size={12}/> REMOVE YEAR
            </button>
            <button onClick={addRevenueYear} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded text-[10px] font-black hover:bg-blue-700 transition-shadow shadow-sm">
              <CalendarPlus size={12}/> ADD YEAR
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {revenueCategories.map((cat) => (
            <div key={cat} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-[9px] block mb-2 text-gray-600">{cat}</span>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${revenueYears.length}, minmax(0, 1fr))` }}>
                {revenueYears.map((yearKey: string, idx: number) => (
                  <input key={yearKey} className="p-2 text-[10px] border rounded bg-gray-50 font-black" placeholder={`YEAR ${idx + 1}`} value={instData.revenueData?.[cat]?.[yearKey] || ""} onChange={(e) => updateNestedData('revenueData', cat, yearKey, e.target.value)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TabInstitutionalSupport 
        editData={editData} 
        setEditData={setEditData}
        updateArrayItem={updateArrayItem} 
        addArrayItem={addArrayItem} 
        removeArrayItem={removeArrayItem} 
      />
    </div>
  );
}