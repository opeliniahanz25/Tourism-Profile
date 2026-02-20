import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, LayoutDashboard, Users, ShieldAlert, AlertTriangle, Lock
} from "lucide-react";
import { Toaster } from "sonner";
import backgroundImage from '../assets/background.jpg';

// Assets
import shesh from '../assets/shesh.png'; 
import { initialProfileData, type ProfileData } from '../data/profileData';

// Define and export the props interface
export interface AdminDashboardProps {
  data: any; // Make it required since you're passing it from App.tsx
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  useEffect(() => {
    // If data is provided via props, use it
    if (data) {
      setProfileData(data);
    } else {
      // Otherwise fallback to localStorage
      const savedData = localStorage.getItem('profileData');
      if (savedData) setProfileData(JSON.parse(savedData));
    }
  }, [data]);

  // Also listen for storage events (for real-time updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('profileData');
      if (savedData) setProfileData(JSON.parse(savedData));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const EmptyRow = ({ colSpan, message }: { colSpan: number, message: string }) => (
    <tr>
      <td colSpan={colSpan} className="p-10 text-center text-gray-400 italic text-xs bg-white border border-gray-100 uppercase font-bold tracking-tight">
        {message}
      </td>
    </tr>
  );

  return (
    <div 
      className="min-h-screen font-sans text-gray-900 pb-20 uppercase"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Toaster position="top-center" richColors />
      
      {/* HEADER SECTION */}
      <header className="bg-white border-b-4 border-blue-600 sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={shesh} alt="Panglao Logo" className="h-14 w-auto" />
            <div>
              <h1 className="text-xl font-black text-blue-700 leading-none uppercase">Municipality of Panglao</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Office of the Municipal Tourism Officer</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-black hover:bg-gray-50 transition-all uppercase">
              <ArrowLeft size={14} /> Logout
            </button>
            <button 
              onClick={() => navigate('/admin-panel')} 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all uppercase shadow-md"
            >
              <Lock size={14} /> Admin Panel
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 space-y-10 uppercase">
        
        {/* TITLE CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-100"></div>
          <div className="flex justify-between items-start mb-4">
            <img src={shesh} alt="Logo" className="h-20 w-auto" />
            <div className="text-center">
              <p className="text-gray-500 text-[10px] font-bold tracking-widest mb-1">Republic of the Philippines • Province of Bohol</p>
              <h2 className="text-xl font-black text-gray-900">Municipality of Panglao</h2>
            </div>
            <div className="h-20 w-20 flex items-center justify-center italic text-gray-300 text-xs border border-dashed border-gray-200 p-2 font-black leading-tight">Behold Bohol</div>
          </div>
          <h3 className="text-blue-500 font-black text-xs tracking-[0.2em] mb-4">Office of the Municipal Tourism Officer</h3>
          <div className="bg-gray-100 py-4 px-8 rounded-lg">
            <h4 className="text-2xl font-black text-gray-800 tracking-tighter">Panglao Local Tourism Industry Profile</h4>
          </div>
        </div>

        {/* I. BASIC LGU INFO */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
          <div className="p-6 border-b border-gray-100 font-black text-gray-800 tracking-tight flex items-center gap-2">
            <LayoutDashboard size={20} className="text-blue-600" /> I. Basic LGU Information
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 font-black"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Name of LGU:</span>{profileData.basicInfo.name}</div>
            <div className="grid grid-cols-2 divide-x divide-gray-100 uppercase">
              <div className="p-4 font-black"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Province:</span>{profileData.basicInfo.province}</div>
              <div className="p-4 font-black"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Region:</span>{profileData.basicInfo.region}</div>
              <div className="p-4 font-black border-t border-gray-100"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Population:</span>{profileData.basicInfo.population || "-"}</div>
              <div className="p-4 font-black border-t border-gray-100"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Land Area:</span>{profileData.basicInfo.landArea}</div>
              <div className="p-4 font-black border-t border-gray-100"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Number of Barangays:</span>{profileData.basicInfo.barangays}</div>
              <div className="p-4 font-black border-t border-gray-100"><span className="text-[10px] text-gray-400 mr-2 tracking-widest">Ethnic Groups:</span>{profileData.basicInfo.ethnicGroups}</div>
            </div>
            <div className="p-4 font-black"><span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Religions:</span>{profileData.basicInfo.religions}</div>
            <div className="p-4 font-black"><span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Language/s Spoken:</span>{profileData.basicInfo.languages}</div>
            <div className="p-4 font-black bg-gray-50/30"><span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Major Economic Activities:</span>{profileData.basicInfo.economicActivities}</div>
          </div>
        </section>

        {/* LOCAL GOVERNMENT OFFICIALS */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
          <div className="p-6 border-b border-gray-100 font-black text-gray-800 tracking-tight flex items-center gap-2">
            <Users size={18} className="text-blue-600"/> Local Government Officials
          </div>
          <div className="divide-y divide-gray-100 font-black">
            <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-24 tracking-widest">Mayor:</span>{profileData.officials.mayor}</div>
            <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-24 tracking-widest">Vice Mayor:</span>{profileData.officials.viceMayor}</div>
            <div className="p-2 bg-gray-50/50 text-[10px] font-black text-gray-400 text-center tracking-[0.2em]">Sangguniang Bayan Members</div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              {profileData.officials.council.map((name, i) => (
                <div key={i} className="p-3 border-b border-gray-100 text-[11px] text-center">{name}</div>
              ))}
            </div>
            <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-32 tracking-widest">Tourism Officer:</span>{profileData.officials.tourismOfficer}</div>
            <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-56 tracking-widest">Planning and Development Coordinator:</span>{profileData.officials.planningCoordinator}</div>
          </div>
        </section>

        {/* II. PROFILE OF ASSETS */}
        <section className="space-y-6">
          <div className="bg-cyan-500 p-3 rounded-md shadow-md font-black text-white text-center tracking-[0.3em] text-sm">II. Profile of Tourism Resources and Assets</div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-black text-[10px] text-gray-500 uppercase tracking-widest">A. Tourism Attractions and Activities</div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 font-black border-b border-gray-100">
                  <th className="p-4 border-r border-gray-100 text-center">Category</th>
                  <th className="p-4 border-r border-gray-100 text-center">Attraction</th>
                  <th className="p-4 border-r border-gray-100 text-center">Location</th>
                  <th className="p-4 text-center">Activities</th>
                </tr>
              </thead>
              <tbody><EmptyRow colSpan={4} message="No tourism attractions added yet" /></tbody>
            </table>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-black text-[10px] text-gray-500 uppercase tracking-widest">C. Accommodation and other Facilities</div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 font-black border-b border-gray-100">
                  <th className="p-4 border-r border-gray-100 text-center w-1/4">Nature</th>
                  <th className="p-4 border-r border-gray-100 text-center w-1/4">Establishment/Facility</th>
                  <th className="p-4 border-r border-gray-100 text-center w-1/4">Location</th>
                  <th className="p-4 text-center">Contact Details</th>
                </tr>
              </thead>
              <tbody><EmptyRow colSpan={4} message="No accommodation facilities added yet" /></tbody>
            </table>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-black text-[10px] text-gray-500 uppercase tracking-widest">D. Accommodation Profile</div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 font-black border-b border-gray-100">
                  <th className="p-4 border-r border-gray-100 text-center">Name of Establishment</th>
                  <th className="p-4 border-r border-gray-100 text-center">Type</th>
                  <th className="p-4 border-r border-gray-100 text-center"># of Rooms</th>
                  <th className="p-4 border-r border-gray-100 text-center">Average Rate</th>
                  <th className="p-4 text-center">Occupancy Rate</th>
                </tr>
              </thead>
              <tbody><EmptyRow colSpan={5} message="No accommodation profiles added yet" /></tbody>
            </table>
          </div>
        </section>

        {/* E. TRANSPORTATION */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
          <div className="p-4 bg-gray-50 border-b border-gray-100 font-black text-gray-600 text-xs tracking-widest">E. Transportation</div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/30 text-[10px] text-gray-400 font-black border-b">
              <tr>
                <th className="p-4 border-r border-gray-100 text-center">Type</th>
                <th className="p-4 border-r border-gray-100 text-center">Schedules</th>
                <th className="p-4 border-r border-gray-100 text-center">Route</th>
                <th className="p-4 text-center">Average Fare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-black text-gray-800">
              {['Jeepney', 'Bus', 'Van', 'Airplane', 'Boat', 'Tricycle', 'Habal-Habal', 'Others:'].map((t) => (
                <tr key={t} className="hover:bg-gray-50 font-black text-[11px]">
                  <td className="p-4 border-r border-gray-100 uppercase">{t}</td>
                  <td className="p-4 border-r border-gray-100 text-center">-</td>
                  <td className="p-4 border-r border-gray-100 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* III. INSTITUTIONAL ELEMENTS */}
        <section className="space-y-6">
          <div className="bg-cyan-500 p-3 rounded-md shadow-md font-black text-white text-center tracking-[0.3em] text-sm">III. INSTITUTIONAL ELEMENTS</div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-white border-b border-gray-100 font-bold text-sm text-gray-800">A. Accommodation and Other Facilities</div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 font-black border-b border-gray-100">
                  <th className="p-4 border-r border-gray-100 text-center w-[15%]">Groups</th>
                  <th className="p-4 border-r border-gray-100 text-center w-[20%]">Role in Tourism</th>
                  <th className="p-4 border-r border-gray-100 text-center w-[30%]">Name of Organization and Head</th>
                  <th className="p-4 text-center w-[35%]">Address and Contact Details</th>
                </tr>
              </thead>
              <tbody><EmptyRow colSpan={4} message="No institutional elements added yet" /></tbody>
            </table>
          </div>
        </section>

        {/* F. LABOR FORCE */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b font-black text-gray-800 text-sm tracking-tight">F. Labor Force</div>
          <table className="w-full text-left text-xs border-collapse font-black">
            <thead className="bg-gray-50 text-gray-400 border-b">
              <tr>
                <th className="p-4 border-r w-1/2 text-center" rowSpan={2}>Category</th>
                <th className="p-2 border-r text-center" colSpan={2}>Number of Employees</th>
              </tr>
              <tr>
                <th className="p-2 border-r text-center border-t border-gray-100">Male</th>
                <th className="p-2 text-center border-t border-gray-100">Female</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers'].map(item => (
                <tr key={item}><td className="p-4 border-r bg-gray-50/20">{item}</td><td className="p-4 border-r text-center">-</td><td className="p-4 text-center">-</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* B. REVENUE CONTRIBUTIONS */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b font-black text-gray-800 text-sm tracking-tight uppercase">B. Total Revenue Contributions to LGU for the Past 3 Years</div>
          <table className="w-full text-left text-xs border-collapse font-black">
            <thead className="bg-gray-50 text-gray-400 border-b uppercase">
              <tr>
                <th className="p-4 border-r w-1/3 text-center" rowSpan={2}>Category</th>
                <th className="p-2 text-center" colSpan={3}>Total Revenue Contributions (PhP)</th>
              </tr>
              <tr className="border-t border-gray-100">
                <th className="p-2 border-r text-center">Year 1</th>
                <th className="p-2 border-r text-center">Year 2</th>
                <th className="p-2 text-center">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers', 'MICE'].map(item => (
                <tr key={item}><td className="p-4 border-r bg-gray-50/20">{item}</td><td className="p-4 border-r text-center">0.00</td><td className="p-4 border-r text-center">0.00</td><td className="p-4 text-center">0.00</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* C. EMERGENCY & D. TOURISM EDUCATION */}
        <div className="space-y-10">
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b font-black text-gray-800 text-sm tracking-tight">C. Emergency Contacts</div>
            <table className="w-full text-left text-[10px] border-collapse uppercase font-bold">
              <thead className="bg-gray-50 text-gray-400 border-b">
                <tr><th className="p-4 border-r text-center">Office/Agency</th><th className="p-4 border-r text-center">Contact Person</th><th className="p-4 border-r text-center">Address</th><th className="p-4 text-center">Phone Number</th></tr>
              </thead>
              <tbody><EmptyRow colSpan={4} message="No emergency contacts added yet" /></tbody>
            </table>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b font-black text-gray-800 text-sm tracking-tight">D. Tourism Education</div>
            <table className="w-full text-left text-[10px] border-collapse uppercase font-bold">
              <thead className="bg-gray-50 text-gray-400 border-b">
                <tr>
                  <th className="p-4 border-r text-center" rowSpan={2}>Title of Training/Study Tours</th>
                  <th className="p-4 border-r text-center" rowSpan={2}>Date, Venue</th>
                  <th className="p-2 border-r text-center" colSpan={2}>Number of Participants</th>
                  <th className="p-4 border-r text-center" rowSpan={2}>Participant Groups</th>
                  <th className="p-4 text-center" rowSpan={2}>Organized/Conducted by</th>
                </tr>
                <tr className="border-t border-gray-100">
                  <th className="p-2 border-r text-center">Male</th><th className="p-2 border-r text-center">Female</th>
                </tr>
              </thead>
              <tbody><EmptyRow colSpan={6} message="No tourism education records added yet" /></tbody>
            </table>
          </section>
        </div>

        {/* E. TOURISM PROJECTS */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b font-black text-gray-800 text-sm tracking-tight">E. Tourism Projects in the Past 5 Years</div>
          <table className="w-full text-left text-[10px] border-collapse uppercase font-bold">
            <thead className="bg-gray-50 text-gray-400 border-b">
              <tr><th className="p-4 border-r text-center">Name of Project</th><th className="p-4 border-r text-center">Duration</th><th className="p-4 border-r text-center">Implementing Agency</th><th className="p-4 border-r text-center">Partners</th><th className="p-4 border-r text-center">Amount</th><th className="p-4 text-center">Sources of Funds</th></tr>
            </thead>
            <tbody><EmptyRow colSpan={6} message="No tourism projects added yet" /></tbody>
          </table>
        </section>

        {/* F. PEACE AND ORDER */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b font-black text-gray-800 flex items-center gap-2 text-sm tracking-tight">
            <ShieldAlert size={18} className="text-orange-500"/> F. Peace and Order and Incidence of Crime
          </div>
          <table className="w-full text-left text-xs border-collapse font-black uppercase">
            <thead className="bg-gray-50 text-gray-400 border-b">
              <tr><th className="p-4 border-r w-1/2 text-center">Nature of Incident</th><th className="p-4 text-center">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                "Kidnapping of Tourists", "Drowning of Tourists", "Petty theft involving local guides",
                "Road accidents involving tourists", "Prostitution/sexual harassment", "Use of prohibited drugs",
                "Pedophiles caught", "Masseurs got pregnant by tourist", "Trafficking of women and children",
                "Incidence of female tourists travelling alone", "Others:"
              ].map((incident) => (
                <tr key={incident} className="hover:bg-gray-50/50"><td className="p-4 border-r border-gray-100 text-[11px] uppercase">{incident}</td><td className="p-4 italic text-gray-400 font-normal text-center">No reported description</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* G. HAZARD MATRIX */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-10 uppercase">
          <div className="p-4 border-b font-black text-gray-800 flex items-center gap-2 text-sm tracking-tight">
            <AlertTriangle size={18} className="text-yellow-500"/> G. Hazard Matrix
          </div>
          <table className="w-full text-left text-xs border-collapse font-black">
            <thead className="bg-gray-50 text-[10px] text-gray-400 border-b">
              <tr><th className="p-4 border-r">Hazard</th><th className="p-4 border-r text-center">Location</th><th className="p-4 border-r text-center">Tourist Attraction Location</th><th className="p-4 text-center">No. of Population Affected</th></tr>
            </thead>
            <tbody>
              {['Earthquake', 'Landslide', 'Storm Surge', 'Tsunami', 'Others:'].map((item) => (
                <tr key={item} className="border-b border-gray-100 last:border-0 font-black text-gray-800">
                  <td className="p-4 border-r border-gray-100 uppercase">{item}</td>
                  <td className="p-4 border-r border-gray-100 text-center">-</td>
                  <td className="p-4 border-r border-gray-100 text-center">-</td>
                  <td className="p-4 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-10 bg-[#1e293b] text-center border-t border-gray-200">
        <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-2">© 2026 Municipality of Panglao - Office of the Municipal Tourism Officer</p>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest">Republic of the Philippines | Province of Bohol</p>
      </footer>
    </div>
  );
}