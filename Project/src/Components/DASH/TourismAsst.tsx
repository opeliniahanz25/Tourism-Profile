import { EmptyRow } from './Common';

export default function TourismAsst({ data }: { data: any }) {
  const accommodations = data?.accommodations || [];
  const facilities = data?.facilities || [];

  return (
    <div className="space-y-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6">
        <h3 className="text-xs font-bold text-blue-600 mb-4 uppercase tracking-widest border-b pb-2">
          C. Accommodation Facilities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs text-left">
            <thead className="bg-gray-50 text-gray-400 font-black uppercase">
              <tr>
                <th className="p-4 border border-gray-300">Name of Establishment</th>
                <th className="p-4 border border-gray-300 text-center w-24">Rooms</th>
                <th className="p-4 border border-gray-300 text-center w-24">Capacity</th>
                <th className="p-4 border border-gray-300">Location</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {accommodations.length > 0 ? (
                accommodations.map((item: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 h-12 transition-colors">
                    <td className="p-4 border border-gray-300">{item.name || ""}</td>
                    <td className="p-4 border border-gray-300 text-center">{item.rooms || "-"}</td>
                    <td className="p-4 border border-gray-300 text-center">{item.capacity || "-"}</td>
                    <td className="p-4 border border-gray-300">{item.location || ""}</td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={4} message="No accommodations registered." />
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6">
        <h3 className="text-xs font-black text-blue-600 mb-4 uppercase tracking-widest border-b pb-2">
          D. Other Tourism-Related Facilities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs text-left">
            <thead className="bg-gray-50 text-gray-400 font-black uppercase">
              <tr>
                <th className="p-4 border border-gray-300 w-1/3">Facility Type</th>
                <th className="p-4 border border-gray-300">Name / Description</th>
                <th className="p-4 border border-gray-300">Location</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {facilities.length > 0 ? (
                facilities.map((item: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 h-12 transition-colors">
                    <td className="p-4 border border-gray-300">{item.type || ""}</td>
                    <td className="p-4 border border-gray-300">{item.name || ""}</td>
                    <td className="p-4 border border-gray-300">{item.location || ""}</td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={3} message="No additional facilities listed." />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}