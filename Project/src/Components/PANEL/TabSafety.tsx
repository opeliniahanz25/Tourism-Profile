import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function TabSafety({ editData, setEditData }: { editData: any, setEditData: any }) {
  
  // Reuse the nested update logic for Hazards
  const updateNestedData = (section: string, category: string, field: string, value: string) => {
    setEditData({
      ...editData,
      [section]: {
        ...editData[section],
        [category]: {
          ...editData[section]?.[category],
          [field]: value.toUpperCase()
        }
      }
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
      
      {/* SECTION F: PEACE AND ORDER */}
      <section className="space-y-4">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
          <ShieldAlert size={16}/> F. Peace and Order
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {["Kidnapping", "Drowning", "Petty theft", "Road accidents", "Prohibited drugs", "Trafficking", "Others:"].map((incident) => (
            <div key={incident} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="col-span-4 text-[10px] font-black">{incident}</span>
              <input 
                className="col-span-8 p-2 text-[10px] border rounded bg-white font-black" 
                placeholder="STATUS/DESCRIPTION" 
                value={editData.crimeIncidents?.[incident] || ""} 
                onChange={(e) => {
                  setEditData({ 
                    ...editData, 
                    crimeIncidents: { 
                      ...editData.crimeIncidents, 
                      [incident]: e.target.value.toUpperCase() 
                    }
                  });
                }} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: HAZARD MATRIX */}
      <section className="space-y-4 pt-6 border-t border-gray-100 pb-10">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
          <AlertTriangle size={16}/> G. Hazard Matrix
        </h3>
        <div className="space-y-2">
          {['Earthquake', 'Landslide', 'Storm Surge', 'Tsunami', 'Others:'].map((hazard) => (
            <div key={hazard} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="col-span-3 text-[10px]">{hazard}</span>
              <input 
                className="col-span-5 p-2 text-[10px] border rounded bg-white font-black" 
                placeholder="LOCATION" 
                value={editData.hazardMatrix?.[hazard]?.location || ""} 
                onChange={(e) => updateNestedData('hazardMatrix', hazard, 'location', e.target.value)} 
              />
              <input 
                className="col-span-4 p-2 text-[10px] border rounded bg-white font-black" 
                placeholder="POPULATION AFFECTED" 
                value={editData.hazardMatrix?.[hazard]?.population || ""} 
                onChange={(e) => updateNestedData('hazardMatrix', hazard, 'population', e.target.value)} 
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}