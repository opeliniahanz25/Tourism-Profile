import { Users } from "lucide-react";

export default function Officials({ data }: { data: any }) {
  return (
    <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden text-sm uppercase">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-white/20 font-black text-gray-900 tracking-tight flex items-center gap-2 bg-white/10">
        <Users size={18} className="text-blue-700"/> Local Government Officials
      </div>

      <div className="divide-y divide-white/20 font-black">
        {/* MAYOR */}
        <div className="p-4 flex gap-2 hover:bg-white/20 transition-all duration-300">
          <span className="text-gray-600 text-[10px] w-24 tracking-widest opacity-70">Mayor:</span>
          <span className="drop-shadow-sm">{data?.mayor || "-"}</span>
        </div>

        {/* VICE MAYOR */}
        <div className="p-4 flex gap-2 hover:bg-white/20 transition-all duration-300">
          <span className="text-gray-600 text-[10px] w-24 tracking-widest opacity-70">Vice Mayor:</span>
          <span className="drop-shadow-sm">{data?.viceMayor || "-"}</span>
        </div>
        
        {/* SECTION DIVIDER */}
        <div className="p-2 bg-white/10 text-[10px] font-black text-gray-500 text-center tracking-[0.2em] backdrop-blur-md">
          Sangguniang Bayan Members
        </div>

        {/* COUNCIL MEMBERS GRID */}
        <div className="grid grid-cols-2 divide-x divide-white/20 border-b border-white/20">
          {data?.council?.map((name: string, i: number) => (
            <div 
              key={i} 
              className={`p-3 text-[11px] text-center hover:bg-white/20 transition-all duration-300 ${
                // Adds a bottom border to all except the last row using the glass theme
                i < (data.council.length - 2) ? "border-b border-white/20" : ""
              }`}
            >
              <span className="drop-shadow-sm">{name || "-"}</span>
            </div>
          ))}
        </div>

        {/* TOURISM OFFICER */}
        <div className="p-4 flex gap-2 hover:bg-white/20 transition-all duration-300">
          <span className="text-gray-600 text-[10px] w-32 tracking-widest opacity-70">Tourism Officer:</span>
          <span className="drop-shadow-sm">{data?.tourismOfficer || "-"}</span>
        </div>

        {/* PLANNING COORDINATOR */}
        <div className="p-4 flex gap-2 hover:bg-white/20 transition-all duration-300">
          <span className="text-gray-600 text-[10px] w-70 tracking-widest opacity-70">Planning and Development Coordinator:</span>
          <span className="drop-shadow-sm">{data?.planningCoordinator || "-"}</span>
        </div>
      </div>
    </section>
  );
}