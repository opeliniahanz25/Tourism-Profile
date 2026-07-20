import { Phone, Users, GraduationCap, Briefcase, Building2 } from "lucide-react";

export default function InstitutionalElements({ data }: { data: any }) {
  const EmptyRow = ({ colSpan }: { colSpan: number }) => (
    <tr>
      <td colSpan={colSpan} className="p-8 text-center text-[10px] text-gray-500 italic font-black opacity-60">
        NO DATA RECORDED IN THIS SECTION
      </td>
    </tr>
  );

  const laborCats = ['Accommodation', 'Travel Agency', 'Sea Transportation', 'Land Transportation', 'Air Transportation', 'Bars and Restaurants', 'Health and Wellness Centers'];
  const revCats = [...laborCats, 'MICE'];
  const revenueYears: string[] = data?.revenueYears || ['y1', 'y2', 'y3'];

  return (
    <div className="space-y-12 uppercase font-black">
      {/* SECTION TITLE - Glass Style */}
      <div className="bg-blue-600/80 backdrop-blur-md p-3 rounded-xl shadow-lg text-white text-center tracking-[0.3em] text-sm mb-10 border border-white/20">
        III. INSTITUTIONAL ELEMENTS
      </div>

      {/* A. FACILITIES */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm">
          <Building2 size={18} className="text-blue-700"/> A. ACCOMMODATION AND OTHER FACILITIES
        </div>
        <table className="w-full text-left text-[11px] table-fixed">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20 w-1/4">GROUPS</th>
              <th className="p-4 border-r border-white/20 w-1/4">ROLE IN TOURISM</th>
              <th className="p-4 border-r border-white/20 w-1/4">NAME OF ORGANIZATION AND HEAD</th>
              <th className="p-4 w-1/4">ADDRESS AND CONTACT DETAILS</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data?.institutionalFacilities?.length > 0 ? data.institutionalFacilities.map((item: any, i: number) => (
              <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{item.group}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{item.role}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{item.name}</td>
                <td className="p-4 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{item.contact}</td>
              </tr>
            )) : <EmptyRow colSpan={4} />}
          </tbody>
        </table>
      </section>

      {/* F. LABOR FORCE */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm">
          <Users size={18} className="text-purple-700"/> F. LABOR FORCE (NUMBER OF EMPLOYEES)
        </div>
        <table className="w-full text-left text-[11px]">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20">CATEGORY</th>
              <th className="p-4 border-r border-white/20 text-center">MALE</th>
              <th className="p-4 text-center">FEMALE</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {laborCats.map(item => (
              <tr key={item} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 bg-white/5 align-top drop-shadow-sm">{item}</td>
                <td className="p-4 border-r border-white/10 text-center text-black align-top drop-shadow-sm">{data?.laborForce?.[item]?.male || "0"}</td>
                <td className="p-4 text-center text-black align-top drop-shadow-sm">{data?.laborForce?.[item]?.female || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* B. REVENUE */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 text-sm">B. TOTAL REVENUE CONTRIBUTIONS TO LGU</div>
        <table className="w-full text-left text-[11px]">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20" rowSpan={2}>CATEGORY</th>
              <th className="p-2 text-center border-b border-white/10" colSpan={revenueYears.length}>REVENUE (PHP)</th>
            </tr>
            <tr>
              {revenueYears.map((_, idx) => (
                <th key={idx} className="p-2 border-r border-white/10 last:border-r-0 text-center">YEAR {idx + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {revCats.map(item => (
              <tr key={item} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 bg-white/5 align-top drop-shadow-sm">{item}</td>
                {revenueYears.map((yearKey: string) => (
                  <td key={yearKey} className="p-4 border-r border-white/10 last:border-r-0 text-center align-top drop-shadow-sm">
                    {data?.revenueData?.[item]?.[yearKey] || "0.00"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* C. EMERGENCY */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm">
          <Phone size={18} className="text-green-700"/> C. EMERGENCY CONTACT AGENCIES
        </div>
        <table className="w-full text-left text-[11px] table-fixed">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20">OFFICE</th>
              <th className="p-4 border-r border-white/20">PERSON</th>
              <th className="p-4 border-r border-white/20">ADDRESS</th>
              <th className="p-4">PHONE</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data?.emergencyContacts?.length > 0 ? data.emergencyContacts.map((c: any, i: number) => (
              <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{c.office}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{c.person}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{c.address}</td>
                <td className="p-4 text-black align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{c.phone}</td>
              </tr>
            )) : <EmptyRow colSpan={4} />}
          </tbody>
        </table>
      </section>

      {/* D. EDUCATION */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm">
          <GraduationCap size={18} /> D. TOURISM EDUCATION (TRAININGS & CAPACITY BUILDING)
        </div>
        <table className="w-full text-left text-[11px] table-fixed">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20">TRAINING TITLE</th>
              <th className="p-4 border-r border-white/20">DATE/VENUE</th>
              <th className="p-4 border-r border-white/20 text-center">MALE</th>
              <th className="p-4 border-r border-white/20 text-center">FEMALE</th>
              <th className="p-4 border-r border-white/20 text-center">Particular Group</th>
              <th className="p-4">ORGANIZER</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data?.tourismEducation?.length > 0 ? data.tourismEducation.map((edu: any, i: number) => (
              <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{edu.title}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{edu.date}</td>
                <td className="p-4 border-r border-white/10 text-center align-top drop-shadow-sm">{edu.male}</td>
                <td className="p-4 border-r border-white/10 text-center align-top drop-shadow-sm">{edu.female}</td>
                <td className="p-4 border-r border-white/10 text-center align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{edu.Particular}</td>
                <td className="p-4 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{edu.organizer}</td>
              </tr>
            )) : <EmptyRow colSpan={6} />}
          </tbody>
        </table>
      </section>

      {/* E. PROJECTS */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm">
          <Briefcase size={18} /> E. TOURISM PROJECTS IN THE PAST 5 YEARS
        </div>
        <table className="w-full text-left text-[11px] table-fixed">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20">
            <tr>
              <th className="p-4 border-r border-white/20">PROJECT NAME</th>
              <th className="p-4 border-r border-white/20">DURATION</th>
              <th className="p-4 border-r border-white/20">IMPLEMENTING AGENCY</th>
              <th className="p-4 border-r border-white/20">PARTNERS</th>
              <th className="p-4 border-r border-white/20">AMOUNT</th>
              <th className="p-4">FUND SOURCE</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data?.tourismProjects?.length > 0 ? data.tourismProjects.map((p: any, i: number) => (
              <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.name}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.duration}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.agency}</td>
                <td className="p-4 border-r border-white/10 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.partner}</td>
                <td className="p-4 border-r border-white/10 text-black align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.amount}</td>
                <td className="p-4 align-top whitespace-pre-wrap wrap-break-words drop-shadow-sm">{p.source}</td>
              </tr>
            )) : <EmptyRow colSpan={6} />}
          </tbody>
        </table>
      </section>
    </div>
  );
}