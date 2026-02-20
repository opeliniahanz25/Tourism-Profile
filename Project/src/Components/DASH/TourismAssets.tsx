import { EmptyRow } from './Common';
// Import the component directly from your independent file
import TourismAsst from './TourismAsst';

export default function TourismAssets({ data }: { data: any }) {
  // 'data' here is profileData.tourismAssets passed from AdminDashboard
  const attractions = data?.attractions || [];

  return (
    <section className="space-y-10">
      {/* MAIN TITLE */}
      <div className="bg-cyan-600 p-3 rounded-md shadow-md text-white text-center tracking-[0.3em] text-sm font-black uppercase">
        II. Profile of Tourism Resources and Assets
      </div>

      {/* A. ATTRACTIONS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6">
        <h3 className="text-xs font-bold text-blue-600 mb-4 uppercase tracking-widest border-b pb-2">
          A. Tourism Attractions and Activities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead className="bg-gray-50 text-gray-400 font-black uppercase">
              <tr>
                <th className="p-4 border border-gray-300 text-left">Category</th>
                <th className="p-4 border border-gray-300 text-left">Attraction</th>
                <th className="p-4 border border-gray-300 text-left">Location</th>
                <th className="p-4 border border-gray-300 text-left">Activities</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {attractions.length > 0 ? (
                attractions.map((item: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors h-12">
                    <td className="p-4 border border-gray-300 align-top">{item.category}</td>
                    <td className="p-4 border border-gray-300 align-top">{item.name}</td>
                    <td className="p-4 border border-gray-300 align-top">{item.location}</td>
                    <td className="p-4 border border-gray-300 align-top whitespace-pre-wrap">{item.activities}</td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={4} message="No attractions found." />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* B. MAP */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-6">
        <h3 className="text-xs font-bold text-blue-600 mb-4 uppercase tracking-widest border-b pb-2">
          B. Local Tourism Map
        </h3>
        <div className="flex justify-center items-center bg-gray-50 rounded-lg min-h-[400px] border border-dashed border-gray-200">
          {data?.tourismMap ? (
            <img src={data.tourismMap} alt="Map" className="max-w-full h-auto object-contain shadow-lg rounded" />
          ) : (
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Map Not Uploaded</p>
          )}
        </div>
      </div>

      {/* INDEPENDENT SECTIONS C AND D */}
      {/* We pass the whole 'data' object so it can extract accommodations and facilities itself */}
      <TourismAsst data={data} />

    </section>
  );
}