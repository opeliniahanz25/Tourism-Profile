export default function Transportation({ data }: { data: any }) {
  const categories = ['JEEPNEY', 'BUS', 'VAN', 'AIRPLANE', 'BOAT', 'TRICYCLE', 'HABAL-HABAL', 'OTHERS:'];

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm uppercase">
      <div className="p-4 bg-gray-50 border-b border-gray-100 font-black text-gray-600 text-xs tracking-widest">
        E. Transportation
      </div>
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
          {categories.map((t) => {
            const item = Array.isArray(data) 
              ? data.find((d: any) => d.type?.toUpperCase() === t.toUpperCase())
              : data?.[t];

            return (
              <tr key={t} className="hover:bg-gray-50 font-black text-[11px]">
                <td className="p-4 border-r border-gray-100 uppercase bg-gray-50/20">{t}</td>
                <td className="p-4 border-r border-gray-100 text-center">{item?.schedule || "-"}</td>
                <td className="p-4 border-r border-gray-100 text-center">{item?.route || "-"}</td>
                <td className="p-4 text-center">{item?.fare || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}