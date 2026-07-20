import { EmptyRow } from './Common';
import TourismAsst from './TourismAsst';

export default function TourismAssets({ data }: { data: any }) {
  const attractions = data?.attractions || [];

  return (
    <section className="space-y-10">
      {/* SECTION TITLE - Glass Style */}
      <div className="bg-cyan-600/80 backdrop-blur-md p-3 rounded-xl shadow-lg text-white text-center tracking-[0.3em] text-sm font-black uppercase border border-white/20">
        II. Profile of Tourism Resources and Assets
      </div>

      {/* A. Tourism Attractions and Activities */}
      <div className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden p-6">
        <h3 className="text-xs font-black text-blue-700 mb-4 uppercase tracking-widest border-b border-white/20 pb-2 drop-shadow-sm">
          A. Tourism Attractions and Activities
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-white/10 text-gray-600 font-black uppercase border-b border-white/20">
              <tr>
                <th className="p-4 border-r border-white/20 text-left">Category</th>
                <th className="p-4 border-r border-white/20 text-left">Attraction</th>
                <th className="p-4 border-r border-white/20 text-left">Location</th>
                <th className="p-4 text-left">Activities</th>
              </tr>
            </thead>
            <tbody className="font-black uppercase text-gray-800">
              {attractions.length > 0 ? (
                attractions.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors h-12">
                    <td className="p-4 border-r border-white/10 align-top drop-shadow-sm">{item.category}</td>
                    <td className="p-4 border-r border-white/10 align-top drop-shadow-sm">{item.name}</td>
                    <td className="p-4 border-r border-white/10 align-top drop-shadow-sm">{item.location}</td>
                    <td className="p-4 align-top whitespace-pre-wrap drop-shadow-sm">{item.activities}</td>
                  </tr>
                ))
              ) : (
                <EmptyRow colSpan={4} message="No attractions found." />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* B. Local Tourism Map */}
      <div className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden p-6">
        <h3 className="text-xs font-black text-blue-700 mb-4 uppercase tracking-widest border-b border-white/20 pb-2 drop-shadow-sm">
          B. Local Tourism Map
        </h3>
        <div className="flex justify-center items-center bg-white/10 rounded-xl min-h-100 border border-dashed border-white/30 backdrop-blur-md transition-all">
          {data?.tourismMap ? (
            <img 
              src={data.tourismMap} 
              alt="Map" 
              className="max-w-full h-auto object-contain shadow-2xl rounded-lg p-2" 
            />
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest opacity-60">Map Not Uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Assuming TourismAsst also needs the same condition, 
          you should apply these classes inside that component as well */}
      <TourismAsst data={data} />
    </section>
  );
}