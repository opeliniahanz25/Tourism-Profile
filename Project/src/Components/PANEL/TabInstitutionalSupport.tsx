
import { Plus, Trash2, GraduationCap, Briefcase, Phone } from "lucide-react";

export default function TabInstitutionalSupport({ editData, setEditData }: any) {
  
  // --- INTERNAL HELPER FUNCTIONS TO ENSURE BUTTONS WORK ---
  
  const addItem = (arrayName: string, emptyObj: any) => {
    setEditData((prev: any) => ({
      ...prev,
      institutional: {
        ...prev.institutional,
        [arrayName]: [...(prev.institutional?.[arrayName] || []), emptyObj]
      }
    }));
  };

  const updateItem = (arrayName: string, index: number, field: string, value: string) => {
    setEditData((prev: any) => {
      const newArray = [...(prev.institutional?.[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        institutional: {
          ...prev.institutional,
          [arrayName]: newArray
        }
      };
    });
  };

  const removeItem = (arrayName: string, index: number) => {
    setEditData((prev: any) => ({
      ...prev,
      institutional: {
        ...prev.institutional,
        [arrayName]: prev.institutional[arrayName].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  // Ensure arrays exist to avoid .map() errors
  const institutional = editData.institutional || {};
  const emergencyContacts = institutional.emergencyContacts || [];
  const tourismEducation = institutional.tourismEducation || [];
  const tourismProjects = institutional.tourismProjects || [];

  return (
    <div className="space-y-8">
      {/* SECTION C: EMERGENCY CONTACTS */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
            <Phone size={16}/> C. Emergency Contacts
          </h3>
          <button 
            onClick={() => addItem('emergencyContacts', { office: '', person: '', address: '', phone: '' })} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] flex items-center gap-1 transition-colors"
          >
            <Plus size={12}/> Add Contact
          </button>
        </div>
        
        {emergencyContacts.length === 0 && <p className="text-[10px] text-gray-400 italic">No contacts added yet.</p>}
        
        {emergencyContacts.map((item: any, i: number) => (
          <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200">
            <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="OFFICE/AGENCY" value={item.office || ''} onChange={(e) => updateItem('emergencyContacts', i, 'office', e.target.value)} />
            <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="CONTACT PERSON" value={item.person || ''} onChange={(e) => updateItem('emergencyContacts', i, 'person', e.target.value)} />
            <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="ADDRESS" value={item.address || ''} onChange={(e) => updateItem('emergencyContacts', i, 'address', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="PHONE" value={item.phone || ''} onChange={(e) => updateItem('emergencyContacts', i, 'phone', e.target.value)} />
            <button onClick={() => removeItem('emergencyContacts', i)} className="col-span-1 text-red-500 hover:text-red-700 flex justify-center items-center">
              <Trash2 size={14}/>
            </button>
          </div>
        ))}
      </section>

      {/* SECTION D: TOURISM EDUCATION */}
      <section className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
            <GraduationCap size={16}/> D. Tourism Education
          </h3>
          <button 
            onClick={() => addItem('tourismEducation', { title: '', date: '', male: '', female: '', Particular: '', organizer: '' })} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] flex items-center gap-1 transition-colors"
          >
            <Plus size={12}/> Add Record
          </button>
        </div>

        {tourismEducation.map((item: any, i: number) => (
          <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200">
            <input className="col-span-3 p-2 text-[10px] border rounded" placeholder="TRAINING TITLE" value={item.title || ''} onChange={(e) => updateItem('tourismEducation', i, 'title', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="DATE/VENUE" value={item.date || ''} onChange={(e) => updateItem('tourismEducation', i, 'date', e.target.value)} />
            <input className="col-span-1 p-2 text-[10px] border rounded text-center" placeholder="M" value={item.male || ''} onChange={(e) => updateItem('tourismEducation', i, 'male', e.target.value)} />
            <input className="col-span-1 p-2 text-[10px] border rounded text-center" placeholder="F" value={item.female || ''} onChange={(e) => updateItem('tourismEducation', i, 'female', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="PARTICULAR" value={item.Particular || ''} onChange={(e) => updateItem('tourismEducation', i, 'Particular', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="ORGANIZER" value={item.organizer || ''} onChange={(e) => updateItem('tourismEducation', i, 'organizer', e.target.value)} />
            <button onClick={() => removeItem('tourismEducation', i)} className="col-span-1 text-red-500 hover:text-red-700 flex justify-center items-center">
              <Trash2 size={14}/>
            </button>
          </div>
        ))}
      </section>

      {/* SECTION E: TOURISM PROJECTS */}
      <section className="space-y-4 pt-6 border-t border-gray-100 pb-10">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
            <Briefcase size={16}/> E. Tourism Projects
          </h3>
          <button 
            onClick={() => addItem('tourismProjects', { name: '', duration: '', agency: '', partner: '', amount: '', source: '' })} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] flex items-center gap-1 transition-colors"
          >
            <Plus size={12}/> Add Project
          </button>
        </div>

        {tourismProjects.map((item: any, i: number) => (
          <div key={i} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200">
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="NAME" value={item.name || ''} onChange={(e) => updateItem('tourismProjects', i, 'name', e.target.value)} />
            <input className="col-span-1 p-2 text-[10px] border rounded" placeholder="DUR" value={item.duration || ''} onChange={(e) => updateItem('tourismProjects', i, 'duration', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="AGENCY" value={item.agency || ''} onChange={(e) => updateItem('tourismProjects', i, 'agency', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="PARTNER" value={item.partner || ''} onChange={(e) => updateItem('tourismProjects', i, 'partner', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="AMOUNT" value={item.amount || ''} onChange={(e) => updateItem('tourismProjects', i, 'amount', e.target.value)} />
            <input className="col-span-2 p-2 text-[10px] border rounded" placeholder="SOURCE" value={item.source || ''} onChange={(e) => updateItem('tourismProjects', i, 'source', e.target.value)} />
            <button onClick={() => removeItem('tourismProjects', i)} className="col-span-1 text-red-500 hover:text-red-700 flex justify-center items-center">
              <Trash2 size={14}/>
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}