
import { ShieldAlert, AlertTriangle, Phone, Users, GraduationCap, Briefcase, Building2 } from "lucide-react";

export default function InstitutionalElements({ data }: { data: any }) {
  const EmptyRow = ({ colSpan }: { colSpan: number }) => (
    <tr>
      <td colSpan={colSpan} className="p-8 text-center text-[10px] text-gray-400 italic font-normal">
        NO DATA RECORDED IN THIS SECTION
      </td>
    </tr>
  );

  const laborCats = ['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers'];
  const revCats = [...laborCats, 'MICE'];
  const crimeCats = ["Kidnapping", "Drowning", "Petty theft", "Road accidents", "Prohibited drugs", "Trafficking", "Others:"];
  const hazardCats = ['Earthquake', 'Landslide', 'Storm Surge', 'Tsunami', 'Others:'];

  return (
    <div className="space-y-12 uppercase font-black">
      <div className="bg-blue-600 p-3 rounded-md shadow-md text-white text-center tracking-[0.3em] text-sm mb-10">
        III. INSTITUTIONAL ELEMENTS
      </div>

      {/* A. ACCOMMODATION AND OTHER FACILITIES */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <Building2 size={18} className="text-blue-500"/> A. ACCOMMODATION AND OTHER FACILITIES
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">GROUPS/COMMITTEE</th>
              <th className="p-4 border-r">ROLE</th>
              <th className="p-4 border-r">NAME/HEAD</th>
              <th className="p-4 font-black">CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {data?.institutionalFacilities?.length > 0 ? data.institutionalFacilities.map((item: any, i: number) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r">{item.group}</td>
                <td className="p-4 border-r">{item.role}</td>
                <td className="p-4 border-r">{item.name}</td>
                <td className="p-4 font-normal text-black">{item.contact}</td>
              </tr>
            )) : <EmptyRow colSpan={4} />}
          </tbody>
        </table>
      </section>

      {/* F. LABOR FORCE */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <Users size={18} className="text-purple-500"/> F. LABOR FORCE (NUMBER OF EMPLOYEES)
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">CATEGORY</th>
              <th className="p-4 border-r text-center">MALE</th>
              <th className="p-4 text-center">FEMALE</th>
            </tr>
          </thead>
          <tbody>
            {laborCats.map(item => (
              <tr key={item} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r bg-gray-50/20">{item}</td>
                <td className="p-4 border-r text-center font-bold text-blue-600">{data?.laborForce?.[item]?.male || "0"}</td>
                <td className="p-4 text-center font-bold text-pink-600">{data?.laborForce?.[item]?.female || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* B. REVENUE CONTRIBUTIONS */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 text-sm">B. TOTAL REVENUE CONTRIBUTIONS TO LGU (PAST 3 YEARS)</div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r" rowSpan={2}>CATEGORY</th>
              <th className="p-2 text-center border-b border-gray-100" colSpan={3}>REVENUE (PHP)</th>
            </tr>
            <tr>
              <th className="p-2 border-r text-center font-normal">YEAR 1</th>
              <th className="p-2 border-r text-center font-normal">YEAR 2</th>
              <th className="p-2 text-center font-normal">YEAR 3</th>
            </tr>
          </thead>
          <tbody>
            {revCats.map(item => (
              <tr key={item} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r bg-gray-50/20">{item}</td>
                <td className="p-4 border-r text-center font-bold">{data?.revenueData?.[item]?.y1 || "0.00"}</td>
                <td className="p-4 border-r text-center font-bold">{data?.revenueData?.[item]?.y2 || "0.00"}</td>
                <td className="p-4 text-center font-bold">{data?.revenueData?.[item]?.y3 || "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* C. EMERGENCY CONTACTS */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <Phone size={18} className="text-green-500"/> C. EMERGENCY CONTACT AGENCIES
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">OFFICE</th>
              <th className="p-4 border-r">PERSON</th>
              <th className="p-4 border-r">ADDRESS</th>
              <th className="p-4">PHONE</th>
            </tr>
          </thead>
          <tbody>
            {data?.emergencyContacts?.length > 0 ? data.emergencyContacts.map((c: any, i: number) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r">{c.office}</td>
                <td className="p-4 border-r">{c.person}</td>
                <td className="p-4 border-r">{c.address}</td>
                <td className="p-4 font-normal text-gray-500">{c.phone}</td>
              </tr>
            )) : <EmptyRow colSpan={4} />}
          </tbody>
        </table>
      </section>

      {/* D. TOURISM EDUCATION */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <GraduationCap size={18} /> D. TOURISM EDUCATION (TRAININGS & CAPACITY BUILDING)
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">TRAINING TITLE</th>
              <th className="p-4 border-r">DATE/VENUE</th>
              <th className="p-4 border-r text-center">MALE</th>
              <th className="p-4 border-r text-center">FEMALE</th>
              <th className="p-4">ORGANIZER</th>
            </tr>
          </thead>
          <tbody>
            {data?.tourismEducation?.length > 0 ? data.tourismEducation.map((edu: any, i: number) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r">{edu.title}</td>
                <td className="p-4 border-r">{edu.date}</td>
                <td className="p-4 border-r text-center">{edu.male}</td>
                <td className="p-4 border-r text-center">{edu.female}</td>
                <td className="p-4 font-normal">{edu.organizer}</td>
              </tr>
            )) : <EmptyRow colSpan={5} />}
          </tbody>
        </table>
      </section>

      {/* E. TOURISM PROJECTS */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <Briefcase size={18} /> E. TOURISM PROJECTS IN THE PAST 5 YEARS
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">PROJECT NAME</th>
              <th className="p-4 border-r">DURATION</th>
              <th className="p-4 border-r">AGENCY</th>
              <th className="p-4 border-r">AMOUNT</th>
              <th className="p-4">FUND SOURCE</th>
            </tr>
          </thead>
          <tbody>
            {data?.tourismProjects?.length > 0 ? data.tourismProjects.map((p: any, i: number) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r">{p.name}</td>
                <td className="p-4 border-r font-normal text-gray-500">{p.duration}</td>
                <td className="p-4 border-r font-normal">{p.agency}</td>
                <td className="p-4 border-r font-bold">{p.amount}</td>
                <td className="p-4 font-normal">{p.source}</td>
              </tr>
            )) : <EmptyRow colSpan={5} />}
          </tbody>
        </table>
      </section>

      {/* F. PEACE AND ORDER */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <ShieldAlert size={18} className="text-orange-500"/> F. PEACE AND ORDER AND INCIDENCE OF CRIME
        </div>
        <table className="w-full text-left text-[10px]">
          <tbody>
            {crimeCats.map((c) => (
              <tr key={c} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r w-1/3 bg-gray-50/20">{c}</td>
                <td className="p-4 italic text-gray-500 font-normal">
                  {data?.crimeIncidents?.[c] || "NO REPORTED INCIDENTS"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* G. HAZARD MATRIX */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-10">
        <div className="p-4 bg-gray-50 border-b text-gray-800 flex items-center gap-2 text-sm">
          <AlertTriangle size={18} className="text-yellow-500"/> G. HAZARD MATRIX
        </div>
        <table className="w-full text-left text-[10px]">
          <thead className="bg-white text-gray-400 border-b">
            <tr>
              <th className="p-4 border-r">NATURAL DISASTER/HAZARD</th>
              <th className="p-4 border-r text-center">LOCATION</th>
              <th className="p-4 text-center">POPULATION AFFECTED</th>
            </tr>
          </thead>
          <tbody>
            {hazardCats.map((h) => (
              <tr key={h} className="border-b border-gray-100 last:border-0">
                <td className="p-4 border-r bg-gray-50/20">{h}</td>
                <td className="p-4 border-r text-center">{data?.hazardMatrix?.[h]?.location || "-"}</td>
                <td className="p-4 text-center">{data?.hazardMatrix?.[h]?.population || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}