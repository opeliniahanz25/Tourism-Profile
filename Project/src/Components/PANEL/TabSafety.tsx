import * as React from "react";
import { Upload } from "lucide-react";

export default function TabSafety({ editData, setEditData }: { editData: any, setEditData: any }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
      <section className="space-y-6">
        <h3 className="text-sm font-black text-gray-800 border-b pb-3 mb-6 uppercase">PEACE AND ORDER - INCIDENCE OF CRIME</h3>
        <div className="space-y-2">
          {["KIDNAPPING", "DROWNING", "PETTY THEFT", "ROAD ACCIDENTS", "HARASSMENT", "DRUGS"].map((crime) => (
            <div key={crime} className="flex justify-between items-center gap-10 p-2 border-b border-gray-50 font-black">
              <span className="text-[11px] font-black text-gray-600 w-1/3 uppercase">{crime}</span>
              <input className="flex-1 bg-[#f3f4f6] rounded-lg px-4 py-2 text-[10px] font-black outline-none" placeholder="DESCRIPTION" />
            </div>
          ))}
        </div>
      </section>

      <section className="pt-10 border-t font-black">
        <h3 className="text-sm font-black text-gray-800 mb-6 uppercase">HAZARD MATRIX</h3>
        {['EARTHQUAKE', 'LANDSLIDE', 'STORM SURGE', 'TSUNAMI'].map((hazard) => (
          <div key={hazard} className="p-4 bg-[#f9fafb] rounded-xl mb-4 grid grid-cols-3 gap-4">
            <div className="col-span-1 font-black text-blue-600 text-xs self-center">{hazard}</div>
            <input className="bg-white rounded px-3 py-2 text-[10px]" placeholder="LOCATION" />
            <input className="bg-white rounded px-3 py-2 text-[10px]" placeholder="POPULATION AFFECTED" />
          </div>
        ))}
      </section>
    </div>
  );
}