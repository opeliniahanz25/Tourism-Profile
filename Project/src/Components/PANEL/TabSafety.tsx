import React, { useEffect, useRef } from "react";
import { ShieldAlert, AlertTriangle, Plus, Trash2 } from "lucide-react";

export default function TabSafety({ editData, setEditData }: { editData: any, setEditData: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- AUTO-RESIZE LOGIC ---
  const adjustHeight = (el: HTMLTextAreaElement) => {
    if (!el) return;
    el.style.height = 'inherit';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    if (containerRef.current) {
      const textareas = containerRef.current.querySelectorAll('textarea');
      textareas.forEach((textarea) => adjustHeight(textarea as HTMLTextAreaElement));
    }
  }, [editData]);

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(e.target);
  };

  // --- CONFIGURATION ---
  const defaultCrimes = ["KIDNAPPING", "DROWNING", "PETTY THEFT", "ROAD ACCIDENTS", "PROHIBITED DRUGS", "TRAFFICKING"];
  const defaultHazards = ['EARTHQUAKE', 'LANDSLIDE', 'STORM SURGE', 'TSUNAMI'];

  // --- STATE HANDLERS (STRICTLY ROOT LEVEL WITH DB SYNCHRONIZATION) ---
  const updateNestedData = (section: string, snakeSection: string, category: string, field: string, value: string) => {
    setEditData((prev: any) => {
      const updatedCamel = {
        ...(prev[section] || {}),
        [category]: {
          ...(prev[section]?.[category] || {}),
          [field]: value.toUpperCase()
        }
      };
      return {
        ...prev,
        [section]: updatedCamel,
        [snakeSection]: updatedCamel // Explicitly maps key to snake_case mirror for DB pipeline updates
      };
    });
  };

  const addNewItem = (section: string, snakeSection: string) => {
    const name = prompt(`ENTER NEW ${section === 'crimeIncidents' ? 'CRIME' : 'HAZARD'} NAME:`);
    if (name && name.trim() !== "") {
      const upperName = name.trim().toUpperCase();
      setEditData((prev: any) => {
        const updatedSection = {
          ...(prev[section] || prev[snakeSection] || {}),
          [upperName]: section === 'crimeIncidents' ? "" : { location: "", attractionLocation: "", population: "" }
        };
        return {
          ...prev,
          [section]: updatedSection,
          [snakeSection]: updatedSection
        };
      });
    }
  };

  const deleteItem = (section: string, snakeSection: string, key: string) => {
    setEditData((prev: any) => {
      const newSection = { ...(prev[section] || prev[snakeSection] || {}) };
      delete newSection[key];
      return { 
        ...prev, 
        [section]: newSection,
        [snakeSection]: newSection 
      };
    });
  };

  // Support both camelCase states and strict backend tables interchangeably
  const crimeData = editData.crimeIncidents || editData.crime_incidents || {};
  const hazardData = editData.hazardMatrix || editData.hazard_matrix || {};

  const crimeKeys = Array.from(new Set([...defaultCrimes, ...Object.keys(crimeData)]));
  const hazardKeys = Array.from(new Set([...defaultHazards, ...Object.keys(hazardData)]));

  return (
    <div ref={containerRef} className="space-y-12 animate-in fade-in duration-300 uppercase font-black">
      
      {/* SECTION F: PEACE AND ORDER */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
            <ShieldAlert size={16}/> F. Peace and Order
          </h3>
          <button 
            onClick={() => addNewItem('crimeIncidents', 'crime_incidents')}
            className="flex items-center gap-1 text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={14}/> ADD CATEGORY
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {crimeKeys.map((incident) => (
            <div key={incident} className="grid grid-cols-12 gap-4 items-start p-3 bg-gray-50 rounded-lg border border-gray-200 group">
              <div className="col-span-4 flex items-center gap-2 pt-2">
                {!defaultCrimes.includes(incident) && (
                  <button onClick={() => deleteItem('crimeIncidents', 'crime_incidents', incident)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={12}/>
                  </button>
                )}
                <span className="text-[10px] font-black">{incident}</span>
              </div>
              <textarea 
                rows={1}
                className="col-span-8 p-2 text-[10px] border rounded bg-white font-black resize-none min-h-8.5 overflow-hidden focus:ring-1 focus:ring-blue-500 outline-none" 
                placeholder="STATUS/DESCRIPTION" 
                value={crimeData[incident] || ""} 
                onChange={(e) => {
                  handleAutoResize(e);
                  const val = e.target.value.toUpperCase();
                  setEditData((prev: any) => ({
                    ...prev,
                    crimeIncidents: { 
                      ...(prev.crimeIncidents || {}), 
                      [incident]: val 
                    },
                    crime_incidents: {
                      ...(prev.crime_incidents || {}),
                      [incident]: val
                    }
                  }));
                }} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: HAZARD MATRIX */}
      <section className="space-y-4 pt-6 border-t border-gray-100 pb-10">
        <div className="flex justify-between items-center border-b pb-3 border-blue-50">
          <h3 className="text-sm font-black text-blue-600 flex items-center gap-2">
            <AlertTriangle size={16}/> G. Hazard Matrix
          </h3>
          <button 
            onClick={() => addNewItem('hazardMatrix', 'hazard_matrix')}
            className="flex items-center gap-1 text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={14}/> ADD HAZARD
          </button>
        </div>

        <div className="space-y-2">
          {hazardKeys.map((hazard) => {
            const hData = hazardData[hazard];
            return (
              <div key={hazard} className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="col-span-3 flex items-center gap-2 pt-2">
                  {!defaultHazards.includes(hazard) && (
                    <button onClick={() => deleteItem('hazardMatrix', 'hazard_matrix', hazard)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={12}/>
                    </button>
                  )}
                  <span className="text-[9px] font-black leading-tight">{hazard}</span>
                </div>

                <textarea 
                  rows={1}
                  className="col-span-3 p-2 text-[10px] border rounded bg-white font-black resize-none min-h-8.5 overflow-hidden focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="LOCATION" 
                  value={hData?.location || ""} 
                  onChange={(e) => {
                    handleAutoResize(e);
                    updateNestedData('hazardMatrix', 'hazard_matrix', hazard, 'location', e.target.value);
                  }} 
                />

                <textarea 
                  rows={1}
                  className="col-span-3 p-2 text-[10px] border rounded bg-white font-black resize-none min-h-8.5 overflow-hidden focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="ATTRACTION" 
                  value={hData?.attractionLocation || hData?.attraction_location || ""} 
                  onChange={(e) => {
                    handleAutoResize(e);
                    updateNestedData('hazardMatrix', 'hazard_matrix', hazard, 'attractionLocation', e.target.value);
                  }} 
                />

                <textarea 
                  rows={1}
                  className="col-span-3 p-2 text-[10px] border rounded bg-white font-black resize-none min-h-8.5 overflow-hidden focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="POPULATION" 
                  value={hData?.population || ""} 
                  onChange={(e) => {
                    handleAutoResize(e);
                    updateNestedData('hazardMatrix', 'hazard_matrix', hazard, 'population', e.target.value);
                  }} 
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}