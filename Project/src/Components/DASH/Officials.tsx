import { Users } from "lucide-react";

export default function Officials({ data }: { data: any }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm uppercase">
      <div className="p-6 border-b border-gray-100 font-black text-gray-800 tracking-tight flex items-center gap-2">
        <Users size={18} className="text-blue-600"/> Local Government Officials
      </div>
      <div className="divide-y divide-gray-100 font-black">
        <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-24 tracking-widest">Mayor:</span>{data?.mayor}</div>
        <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-24 tracking-widest">Vice Mayor:</span>{data?.viceMayor}</div>
        <div className="p-2 bg-gray-50/50 text-[10px] font-black text-gray-400 text-center tracking-[0.2em]">Sangguniang Bayan Members</div>
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {data?.council?.map((name: string, i: number) => (
            <div key={i} className="p-3 border-b border-gray-100 text-[11px] text-center">{name}</div>
          ))}
        </div>
        <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-32 tracking-widest">Tourism Officer:</span>{data?.tourismOfficer}</div>
        <div className="p-4 flex gap-2"><span className="text-gray-400 text-[10px] w-70 tracking-widest">Planning and Development Coordinator:</span>{data?.planningCoordinator}</div>
      </div>
    </section>
  );
}