import { LayoutDashboard } from "lucide-react";

export default function BasicInfo({ data }: { data: any }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm uppercase">
      <div className="p-6 border-b border-gray-100 font-black text-gray-800 tracking-tight flex items-center gap-2">
        <LayoutDashboard size={20} className="text-blue-600" /> I. Basic LGU Information
      </div>
      <div className="divide-y divide-gray-100">
        <div className="p-4 font-black">
          <span className="text-[10px] text-gray-400 mr-2 tracking-widest">Name of LGU:</span>
          {data?.name || "-"}
        </div>
        
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <div className="p-4 font-black">
            <span className="text-[10px] text-gray-400 mr-2 tracking-widest">Province:</span>
            {data?.province || "-"}
          </div>
          <div className="p-4 font-black">
            <span className="text-[10px] text-gray-400 mr-2 tracking-widest">Region:</span>
            {data?.region || "-"}
          </div>
          <div className="p-4 font-black border-t border-gray-100">
            <span className="text-[10px] text-gray-400 mr-2 tracking-widest">Population:</span>
            {data?.population || "-"}
          </div>
          <div className="p-4 font-black border-t border-gray-100">
            <span className="text-[10px] text-gray-400 mr-2 tracking-widest">Land Area:</span>
            {data?.landArea || "-"}
          </div>
        </div>

        <div className="p-4 font-black">
          <span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Religion:</span>
          {data?.religion || "N/A"}
        </div>

        <div className="p-4 font-black">
          <span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Language/s Spoken:</span>
          {data?.languages || "N/A"}
        </div>

        <div className="p-4 font-black bg-gray-50/30">
          <span className="text-[10px] text-gray-400 block mb-1 tracking-widest">Major Economic Activities:</span>
          {data?.economicActivities || "N/A"}
        </div>
      </div>
    </section>
  );
}