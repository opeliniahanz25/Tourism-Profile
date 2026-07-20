export default function Transportation({ data }: { data: any }) {
  // 1. Define the base categories to ensure they always show up first
  const baseCategories = ['JEEPNEY', 'BUS', 'VAN', 'AIRPLANE', 'BOAT', 'TRICYCLE', 'HABAL-HABAL'];

  // 2. Extract all unique types from the data to include custom ones added via Admin Panel
  const dataArray = Array.isArray(data) 
    ? data 
    : (data && Array.isArray(data.list) ? data.list : []);
  
  // Identify types in data that are not in the base list
  const customTypes = dataArray
    .filter((item: any) => item.type && !baseCategories.includes(item.type.toUpperCase()))
    .map((item: any) => item.type.toUpperCase());

  // 3. Combine them for the full table display
  const allCategories = [...new Set([...baseCategories, ...customTypes])];

  return (
    <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden text-sm uppercase">
      {/* HEADER SECTION */}
      <div className="p-4 bg-white/10 border-b border-white/20 font-black text-gray-800 text-xs tracking-widest drop-shadow-sm">
        E. Transportation
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/5 text-[10px] text-gray-600 font-black border-b border-white/20">
          <tr>
            <th className="p-4 border-r border-white/20 text-center">Type</th>
            <th className="p-4 border-r border-white/20 text-center">Schedules</th>
            <th className="p-4 border-r border-white/20 text-center">Route</th>
            <th className="p-4 text-center">Average Fare</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 font-black text-gray-900">
          {allCategories.map((t) => {
            const item = dataArray.find((d: any) => d.type?.toUpperCase() === t.toUpperCase());

            return (
              <tr key={t} className="hover:bg-white/20 transition-all duration-300 font-black text-[11px]">
                <td className="p-4 border-r border-white/20 uppercase bg-white/5 font-black drop-shadow-sm">
                  {t}
                </td>
                <td className="p-4 border-r border-white/20 text-center font-black drop-shadow-sm">
                  {item?.schedule || "-"}
                </td>
                <td className="p-4 border-r border-white/20 text-center font-black drop-shadow-sm">
                  {item?.route || "-"}
                </td>
                <td className="p-4 text-center font-black drop-shadow-sm">
                  {item?.fare || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}