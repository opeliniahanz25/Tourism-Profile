import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser?.id;
      
      if (!userId) { 
        setLoading(false); 
        return; 
      }

      try {
        const response = await fetch(`/api/get-lgu-data/${userId}`);
        
        if (response.ok) {
          const dbData = await response.json();

          const safeArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim() !== "") {
              try { return JSON.parse(val); } catch { return []; }
            }
            return [];
          };

          const safeObject = (val: any) => {
            if (val && typeof val === 'object' && !Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim() !== "") {
              try { return JSON.parse(val); } catch { return {}; }
            }
            return {};
          };

          // Extract institutional payload cleanly
          const instPayload = dbData.institutional?.data || dbData.institutional || {};

          setProfileData({
            ...initialProfileData,

            // 1. Basic Info
            basicInfo: {
              ...initialProfileData.basicInfo,
              name: dbData.basicInfo?.name || initialProfileData.basicInfo.name || "",
              province: dbData.basicInfo?.province || initialProfileData.basicInfo.province || "",
              region: dbData.basicInfo?.region || initialProfileData.basicInfo.region || "",
              population: dbData.basicInfo?.population || "",
              landArea: dbData.basicInfo?.landArea || dbData.basicInfo?.land_area || "", 
              barangays: dbData.basicInfo?.barangays || "",
              religions: dbData.basicInfo?.religions || dbData.basicInfo?.religion || "", 
              languages: dbData.basicInfo?.languages || "",
              economicActivities: dbData.basicInfo?.economicActivities || dbData.basicInfo?.economic_activities || "" 
            },

            // 2. Officials
            officials: {
              ...initialProfileData.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.viceMayor || dbData.officials?.vice_mayor || "", 
              tourismOfficer: dbData.officials?.tourismOfficer || dbData.officials?.tourism_officer || "", 
              planningCoordinator: dbData.officials?.planningCoordinator || dbData.officials?.planning_coordinator || "",
              council: safeArray(dbData.officials?.council).length > 0 
                ? safeArray(dbData.officials.council) 
                : initialProfileData.officials.council,
            },

            // 3. Tourism Assets
            tourismAssets: {
              ...initialProfileData.tourismAssets,
              attractions: safeArray(dbData.tourismAssets?.attractions),
              accommodations: safeArray(dbData.tourismAssets?.accommodations),
              facilities: safeArray(dbData.tourismAssets?.facilities),
              tourismMap: dbData.tourismAssets?.tourismMap || 
                          dbData.tourismAssets?.tourism_map || 
                          dbData.tourismMap || 
                          ""
            },

            // 4. Transportation
            transportation: {
              ...initialProfileData.transportation,
              list: Array.isArray(dbData.transportation?.list) 
                ? dbData.transportation.list 
                : (Array.isArray(dbData.transportation) ? dbData.transportation : [])
            },

            // 5. Institutional Elements & Safety (Nested inside institutional/top-level according to your schema)
            ...instPayload,
            institutionalFacilities: safeArray(instPayload.institutionalFacilities || instPayload.facilities),
            laborForce: safeObject(instPayload.laborForce),
            revenueData: safeObject(instPayload.revenueData),
            revenueYears: safeArray(instPayload.revenueYears).length > 0 ? safeArray(instPayload.revenueYears) : ['y1', 'y2', 'y3'],
            emergencyContacts: safeArray(instPayload.emergencyContacts),
            tourismEducation: safeArray(instPayload.tourismEducation),
            tourismProjects: safeArray(instPayload.tourismProjects),
            crimeIncidents: safeObject(dbData.institutional?.crimeIncidents || instPayload.crimeIncidents),
            hazardMatrix: safeObject(dbData.institutional?.hazardMatrix || instPayload.hazardMatrix)
          } as any); // Cast as any to bypass strict type mismatch with custom institutional fields
        }
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black animate-pulse uppercase tracking-widest text-blue-600 bg-white">
        Syncing LGU Data...
      </div>
    );
  }

  return <AdminDashboard profileData={profileData} />;
}