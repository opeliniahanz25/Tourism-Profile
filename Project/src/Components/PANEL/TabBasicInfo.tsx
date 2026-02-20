import * as React from "react";
import { type ProfileData } from '../../data/profileData';

interface TabBasicInfoProps {
  editData: ProfileData;
  setEditData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

export default function TabBasicInfo({ editData, setEditData }: TabBasicInfoProps) {
  
  const updateBasic = (field: keyof ProfileData['basicInfo'], value: string) => {
    setEditData({ 
      ...editData, 
      basicInfo: { ...editData.basicInfo, [field]: value } 
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION HEADER */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-tighter">
          Edit Basic LGU Information
        </h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
          Geographical and Demographic Details
        </p>
      </div>

      {/* PRIMARY GRID FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {[
          { id: 'name', label: 'Name of LGU' },
          { id: 'province', label: 'Province' },
          { id: 'region', label: 'Region' },
          { id: 'landArea', label: 'Land Area' },
          { id: 'barangays', label: 'Number of Barangays' },
          { id: 'ethnicGroups', label: 'Ethnic Groups' }
        ].map((field) => (
          <div key={field.id} className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
              {field.label}
            </label>
            <input 
              className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase focus:ring-2 focus:ring-blue-500/20 transition-all" 
              value={(editData.basicInfo as any)[field.id] || ""} 
              onChange={(e) => updateBasic(field.id as any, e.target.value.toUpperCase())} 
            />
          </div>
        ))}
      </div>

      {/* EDITABLE MULTI-ROW SECTION */}
      <div className="space-y-6 pt-6 border-t border-gray-100 uppercase font-black">
        
        {/* Languages Spoken */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
            Languages Spoken
          </label>
          <input 
            className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase focus:ring-2 focus:ring-blue-500/20" 
            placeholder="E.G. VISAYAN, ENGLISH, FILIPINO"
            value={editData.basicInfo.languages || ""}
            onChange={(e) => updateBasic('languages', e.target.value.toUpperCase())}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Editable Religions */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Religions</label>
            <textarea 
              className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase focus:ring-2 focus:ring-blue-500/20 min-h-[80px] resize-none" 
              placeholder="E.G. ROMAN CATHOLIC, PROTESTANTISM"
              value={(editData.basicInfo as any).religion || ""}
              onChange={(e) => updateBasic('religion' as any, e.target.value.toUpperCase())}
            />
          </div>

          {/* Editable Economic Activities */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Major Economic Activities</label>
            <textarea 
              className="w-full bg-[#f3f4f6] border-none rounded-lg px-4 py-2 font-bold text-gray-700 outline-none uppercase focus:ring-2 focus:ring-blue-500/20 min-h-[80px] resize-none" 
              placeholder="E.G. TOURISM, FISHING, FARMING"
              value={(editData.basicInfo as any).economicActivities || ""}
              onChange={(e) => updateBasic('economicActivities' as any, e.target.value.toUpperCase())}
            />
          </div>
        </div>

      </div>
    </div>
  );
}