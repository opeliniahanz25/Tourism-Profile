import { EmptyRow } from './Common';

export default function TourismAsst({ data }: { data: any }) {
  const accommodations = data?.accommodations || [];
  const facilities = data?.facilities || []; 

  return (
    <div className="space-y-10">
      {/* SECTION C: Accommodation Facilities */}
      <div className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <h3 className="text-xs font-black text-blue-700 mb-4 uppercase tracking-widest border-b border-white/20 pb-2 drop-shadow-sm">
          C. Accommodation Facilities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead className="bg-white/10 text-gray-600 font-black uppercase border-b border-white/20">
              <tr>
                <th className="p-4 border-r border-white/20">NATURE</th>
                <th className="p-4 border-r border-white/20 text-center">ESTABLISHMENT/FACILITY</th>
                <th className="p-4 border-r border-white/20 text-center">LOCATION</th>
                <th className="p-4">CONTACT DETAILS</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {accommodations.length > 0 ? (
                accommodations.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                    <td className="p-4 border-r border-white/10 whitespace-normal wrap-break-words leading-normal min-w-37.5 drop-shadow-sm">
                      {item.name || ""}
                    </td>
                    <td className="p-4 border-r border-white/10 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.rooms || "-"}
                    </td>
                    <td className="p-4 border-r border-white/10 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.capacity || "-"}
                    </td>
                    <td className="p-4 whitespace-normal wrap-break-words leading-normal min-w-37.5 drop-shadow-sm">
                      {item.location || ""}
                    </td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={4} message="No accommodations registered." />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION D: Accommodation Profile */}
      <div className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <h3 className="text-xs font-black text-blue-700 mb-4 uppercase tracking-widest border-b border-white/20 pb-2 drop-shadow-sm">
          D. Accommodation Profile
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead className="bg-white/10 text-gray-600 font-black uppercase border-b border-white/20">
              <tr>
                <th className="p-4 border-r border-white/20">NAME OF THE ESTABLISHMENT</th>
                <th className="p-4 border-r border-white/20 text-center">TYPE</th>
                <th className="p-4 border-r border-white/20 text-center"># OF ROOMS</th>
                <th className="p-4 border-r border-white/20 text-center">AVERAGE RATE</th>
                <th className="p-4 text-center">OCCUPANCY RATE</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {facilities.length > 0 ? (
                facilities.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                    <td className="p-4 border-r border-white/10 whitespace-normal wrap-break-words leading-normal min-w-45 drop-shadow-sm">
                      {item.name || "-"}
                    </td>
                    <td className="p-4 border-r border-white/10 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.type || "-"}
                    </td>
                    <td className="p-4 border-r border-white/10 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.rooms || "-"}
                    </td>
                    <td className="p-4 border-r border-white/10 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.rate || "-"}
                    </td>
                    <td className="p-4 text-center whitespace-normal wrap-break-words drop-shadow-sm">
                      {item.occupancy || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={5} message="No profile data available." />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}