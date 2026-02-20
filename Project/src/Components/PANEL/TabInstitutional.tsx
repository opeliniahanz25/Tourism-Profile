
import { Plus, Trash2, ShieldAlert, AlertTriangle, GraduationCap, Briefcase, Phone, Users, Building2 } from "lucide-react";

export default function TabInstitutional({ editData, setEditData }: { editData: any, setEditData: any }) {
  
  // Generic nested update for Objects (Labor, Revenue, Hazards)
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

  // Generic update for Arrays (Facilities, Contacts, Education, Projects)
  const updateArrayItem = (section: string, index: number, field: string, value: string) => {
    const newList = [...(editData[section] || [])];
    newList[index] = { ...newList[index], [field]: value.toUpperCase() };
    setEditData({ ...editData, [section]: newList });
  };

  const addArrayItem = (section: string, defaultObj: any) => {
    setEditData({ ...editData, [section]: [...(editData[section] || []), defaultObj] });
  };

  const removeArrayItem = (section: string, index: number) => {
    const newList = [...(editData[section] || [])];
    newList.splice(index, 1);
    setEditData({ ...editData, [section]: newList });
  };

  const laborCategories = ['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers'];
  const revenueCategories = [...laborCategories, 'MICE'];

  return (
    <div className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
      
      {/* SECTION A: INSTITUTIONAL FACILITIES */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3 border-blue-100">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Building2 size={16}/> A. Institutional Facilities</h3>
          <button onClick={() => addArrayItem('institutionalFacilities', { group: '', role: '', name: '', contact: '' })} 
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded text-[10px]">
            <Plus size={12}/> Add Group
          </button>
        </div>
        <div className="space-y-2">
          {editData.institutionalFacilities?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200">
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="GROUP" value={item.group} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'group', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="ROLE" value={item.role} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'role', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="NAME/HEAD" value={item.name} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'name', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="CONTACT" value={item.contact} onChange={(e) => updateArrayItem('institutionalFacilities', i, 'contact', e.target.value)} />
              <button onClick={() => removeArrayItem('institutionalFacilities', i)} className="col-span-1 text-red-500 flex justify-center hover:bg-red-50 rounded transition-colors"><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION F: LABOR FORCE */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Users size={16}/> F. Labor Force (Employees)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {laborCategories.map((cat) => (
            <div key={cat} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-[9px] block mb-2 text-gray-500">{cat}</span>
              <div className="grid grid-cols-2 gap-2">
                <input className="p-2 text-[10px] border rounded bg-white font-black" placeholder="MALE" value={editData.laborForce?.[cat]?.male || ""} onChange={(e) => updateNestedData('laborForce', cat, 'male', e.target.value)} />
                <input className="p-2 text-[10px] border rounded bg-white font-black" placeholder="FEMALE" value={editData.laborForce?.[cat]?.female || ""} onChange={(e) => updateNestedData('laborForce', cat, 'female', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION B: REVENUE */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-black text-blue-600">B. Revenue Contributions (Past 3 Years)</h3>
        <div className="grid grid-cols-1 gap-3">
          {revenueCategories.map((cat) => (
            <div key={cat} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-[9px] block mb-2 text-gray-600">{cat}</span>
              <div className="grid grid-cols-3 gap-2">
                <input className="p-2 text-[10px] border rounded bg-gray-50 font-black" placeholder="YEAR 1" value={editData.revenueData?.[cat]?.y1 || ""} onChange={(e) => updateNestedData('revenueData', cat, 'y1', e.target.value)} />
                <input className="p-2 text-[10px] border rounded bg-gray-50 font-black" placeholder="YEAR 2" value={editData.revenueData?.[cat]?.y2 || ""} onChange={(e) => updateNestedData('revenueData', cat, 'y2', e.target.value)} />
                <input className="p-2 text-[10px] border rounded bg-gray-50 font-black" placeholder="YEAR 3" value={editData.revenueData?.[cat]?.y3 || ""} onChange={(e) => updateNestedData('revenueData', cat, 'y3', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: EMERGENCY CONTACTS */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Phone size={16}/> C. Emergency Contacts</h3>
          <button onClick={() => addArrayItem('emergencyContacts', { office: '', person: '', address: '', phone: '' })} 
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-[10px]"><Plus size={12}/> Add Contact</button>
        </div>
        {editData.emergencyContacts?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border">
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="OFFICE" value={item.office} onChange={(e) => updateArrayItem('emergencyContacts', i, 'office', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="PERSON" value={item.person} onChange={(e) => updateArrayItem('emergencyContacts', i, 'person', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="ADDRESS" value={item.address} onChange={(e) => updateArrayItem('emergencyContacts', i, 'address', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="PHONE" value={item.phone} onChange={(e) => updateArrayItem('emergencyContacts', i, 'phone', e.target.value)} />
              <button onClick={() => removeArrayItem('emergencyContacts', i)} className="col-span-1 text-red-500 flex justify-center"><Trash2 size={14}/></button>
            </div>
        ))}
      </section>

      {/* SECTION D: TOURISM EDUCATION */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><GraduationCap size={16}/> D. Tourism Education</h3>
          <button onClick={() => addArrayItem('tourismEducation', { title: '', date: '', male: '', female: '', organizer: '' })} 
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-[10px]"><Plus size={12}/> Add Record</button>
        </div>
        {editData.tourismEducation?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border">
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="TRAINING TITLE" value={item.title} onChange={(e) => updateArrayItem('tourismEducation', i, 'title', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="DATE/VENUE" value={item.date} onChange={(e) => updateArrayItem('tourismEducation', i, 'date', e.target.value)} />
              <input className="col-span-1 p-2 text-[10px] border rounded text-center" placeholder="M" value={item.male} onChange={(e) => updateArrayItem('tourismEducation', i, 'male', e.target.value)} />
              <input className="col-span-1 p-2 text-[10px] border rounded text-center" placeholder="F" value={item.female} onChange={(e) => updateArrayItem('tourismEducation', i, 'female', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="ORGANIZER" value={item.organizer} onChange={(e) => updateArrayItem('tourismEducation', i, 'organizer', e.target.value)} />
              <button onClick={() => removeArrayItem('tourismEducation', i)} className="col-span-1 text-red-500 flex justify-center"><Trash2 size={14}/></button>
            </div>
        ))}
      </section>

      {/* SECTION E: TOURISM PROJECTS */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><Briefcase size={16}/> E. Tourism Projects</h3>
          <button onClick={() => addArrayItem('tourismProjects', { name: '', duration: '', agency: '', amount: '', source: '' })} 
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-[10px]"><Plus size={12}/> Add Project</button>
        </div>
        {editData.tourismProjects?.map((item: any, i: number) => (
            <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border">
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="PROJECT NAME" value={item.name} onChange={(e) => updateArrayItem('tourismProjects', i, 'name', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="DURATION" value={item.duration} onChange={(e) => updateArrayItem('tourismProjects', i, 'duration', e.target.value)} />
              <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="AGENCY" value={item.agency} onChange={(e) => updateArrayItem('tourismProjects', i, 'agency', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="AMOUNT" value={item.amount} onChange={(e) => updateArrayItem('tourismProjects', i, 'amount', e.target.value)} />
              <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="FUND SOURCE" value={item.source} onChange={(e) => updateArrayItem('tourismProjects', i, 'source', e.target.value)} />
              <button onClick={() => removeArrayItem('tourismProjects', i)} className="col-span-1 text-red-500 flex justify-center"><Trash2 size={14}/></button>
            </div>
        ))}
      </section>

      {/* SECTION F: PEACE AND ORDER */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
          <ShieldAlert size={16}/> F. Peace and Order
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {["Kidnapping", "Drowning", "Petty theft", "Road accidents", "Prohibited drugs", "Trafficking", "Others:"].map((incident) => (
            <div key={incident} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="col-span-4 text-[10px] font-black">{incident}</span>
              <input className="col-span-8 p-2 text-[10px] border rounded bg-white font-black" placeholder="STATUS/DESCRIPTION" value={editData.crimeIncidents?.[incident] || ""} onChange={(e) => {
                  setEditData({ ...editData, crimeIncidents: { ...editData.crimeIncidents, [incident]: e.target.value.toUpperCase() }});
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: HAZARD MATRIX */}
      <section className="space-y-4 pt-6 border-t border-gray-100 pb-10">
        <h3 className="text-sm font-black text-blue-600 flex items-center gap-2"><AlertTriangle size={16}/> G. Hazard Matrix</h3>
        <div className="space-y-2">
          {['Earthquake', 'Landslide', 'Storm Surge', 'Tsunami', 'Others:'].map((hazard) => (
            <div key={hazard} className="grid grid-cols-12 gap-4 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="col-span-3 text-[10px]">{hazard}</span>
              <input className="col-span-5 p-2 text-[10px] border rounded bg-white font-black" placeholder="LOCATION" value={editData.hazardMatrix?.[hazard]?.location || ""} onChange={(e) => updateNestedData('hazardMatrix', hazard, 'location', e.target.value)} />
              <input className="col-span-4 p-2 text-[10px] border rounded bg-white font-black" placeholder="POPULATION AFFECTED" value={editData.hazardMatrix?.[hazard]?.population || ""} onChange={(e) => updateNestedData('hazardMatrix', hazard, 'population', e.target.value)} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}