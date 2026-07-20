import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function Safety({ data }: { data: any }) {
  // Logic: Check if data is flat (data.crimeIncidents) or nested (data.institutional.crimeIncidents)
  // Updated to include full fallback parameters for snake_case objects coming down from the wrapper
  const source = data?.crimeIncidents || data?.crime_incidents || data?.hazardMatrix || data?.hazard_matrix
    ? data 
    : (data?.institutional || {});

  const defaultCrimes = [
    "KIDNAPPING",
    "DROWNING",
    "PETTY THEFT",
    "ROAD ACCIDENTS",
    "PROHIBITED DRUGS",
    "TRAFFICKING",
  ];
  
  const defaultHazards = [
    "EARTHQUAKE",
    "LANDSLIDE",
    "STORM SURGE",
    "TSUNAMI",
  ];

  // Extract objects safely supporting database schemas
  const coreCrimes = source?.crimeIncidents || source?.crime_incidents || {};
  const coreHazards = source?.hazardMatrix || source?.hazard_matrix || {};

  // Merge default categories with any dynamic keys found in the database
  const crimeCats = Array.from(
    new Set([...defaultCrimes, ...Object.keys(coreCrimes)])
  );
  const hazardCats = Array.from(
    new Set([...defaultHazards, ...Object.keys(coreHazards)])
  );

  return (
    <div className="space-y-12">
      {/* F. PEACE AND ORDER AND INCIDENCE OF CRIME */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden transition-all">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm font-black uppercase">
          <ShieldAlert size={18} className="text-orange-600 drop-shadow-sm" /> F. PEACE AND ORDER AND INCIDENCE OF CRIME
        </div>
        <table className="w-full text-left text-[11px] table-fixed border-collapse">
          <tbody className="text-gray-900">
            {crimeCats.map((c) => (
              <tr key={c} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                <td className="p-4 border-r border-white/10 w-1/3 bg-white/5 font-black align-top uppercase drop-shadow-sm">
                  {c}
                </td>
                <td className="p-4 align-top whitespace-pre-wrap wrap-break-words uppercase font-black drop-shadow-sm">
                  {coreCrimes[c] ||
                    coreCrimes[c.toUpperCase()] ||
                    coreCrimes[c.toLowerCase()] ||
                    "0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* G. HAZARD MATRIX */}
      <section className="bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-2xl overflow-hidden pb-10 transition-all">
        <div className="p-4 bg-white/10 border-b border-white/20 text-gray-900 flex items-center gap-2 text-sm font-black uppercase">
          <AlertTriangle size={18} className="text-yellow-600 drop-shadow-sm" /> G. HAZARD MATRIX
        </div>
        <table className="w-full text-left text-[11px] table-fixed border-collapse">
          <thead className="bg-white/5 text-gray-600 border-b border-white/20 uppercase font-black">
            <tr>
              <th className="p-4 border-r border-white/20 w-1/4">NATURAL DISASTER</th>
              <th className="p-4 border-r border-white/20 text-center w-1/4">LOCATION</th>
              <th className="p-4 border-r border-white/20 text-center w-1/4">TOURIST ATTRACTION</th>
              <th className="p-4 text-center w-1/4">POPULATION AFFECTED</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {hazardCats.map((h) => {
              const hData =
                coreHazards[h] ||
                coreHazards[h.toUpperCase()] ||
                coreHazards[h.toLowerCase()];

              return (
                <tr key={h} className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                  <td className="p-4 border-r border-white/10 bg-white/5 align-top font-black uppercase drop-shadow-sm">
                    {h}
                  </td>
                  <td className="p-4 border-r border-white/10 text-center align-top whitespace-pre-wrap wrap-break-words uppercase font-black drop-shadow-sm">
                    {hData?.location || "-"}
                  </td>
                  <td className="p-4 border-r border-white/10 text-center align-top whitespace-pre-wrap wrap-break-words uppercase font-black drop-shadow-sm">
                    {/* ✅ FIXED: Fallback check added to read attraction_location alongside attractionLocation fields */}
                    {hData?.attractionLocation || hData?.attraction_location || "-"}
                  </td>
                  <td className="p-4 text-center align-top whitespace-pre-wrap wrap-break-words uppercase font-black drop-shadow-sm">
                    {hData?.population || "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}