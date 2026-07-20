import { LayoutDashboard } from "lucide-react";

export default function BasicInfo({ data }: { data: any }) {
  return (
    <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden text-sm uppercase">
      {/* HEADER SECTION - Slightly stronger glass effect for the title */}
      <div className="p-6 border-b border-white/20 font-black text-gray-900 tracking-tight flex items-center gap-2 bg-white/10">
        <LayoutDashboard size={20} className="text-blue-700" /> I. Basic LGU Information
      </div>

      <div className="divide-y divide-white/20">
        {/* NAME OF LGU */}
        <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
          <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Name of LGU:</span>
          {data?.name || "-"}
        </div>
        
        {/* PROVINCE & REGION */}
        <div className="grid grid-cols-2 divide-x divide-white/20">
          <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
            <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Province:</span>
            {data?.province || "-"}
          </div>
          <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
            <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Region:</span>
            {data?.region || "-"}
          </div>
        </div>

        {/* POPULATION & LAND AREA */}
        <div className="grid grid-cols-2 divide-x divide-white/20">
          <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
            <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Population:</span>
            {data?.population || "-"}
          </div>
          <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
            <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Land Area:</span>
            {data?.landArea || "-"}
          </div>
        </div>

        {/* BARANGAYS COUNT */}
        <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
          <span className="text-[10px] text-gray-600 mr-2 tracking-widest uppercase opacity-70">Barangays:</span>
          {data?.barangays || "0"}
        </div>

        {/* RELIGION */}
        <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
          <span className="text-[10px] text-gray-600 block mb-1 tracking-widest uppercase opacity-70">Religion:</span>
          {data?.religions || "N/A"}
        </div>

        {/* LANGUAGES */}
        <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
          <span className="text-[10px] text-gray-600 block mb-1 tracking-widest uppercase opacity-70">Language/s Spoken:</span>
          {data?.languages || "N/A"}
        </div>

        {/* ECONOMIC ACTIVITIES */}
        <div className="p-5 font-black hover:bg-white/20 transition-all duration-300">
          <span className="text-[10px] text-gray-600 block mb-1 tracking-widest uppercase opacity-70">Major Economic Activities:</span>
          {data?.economicActivities || "N/A"}
        </div>
      </div>
    </section>
  );
}