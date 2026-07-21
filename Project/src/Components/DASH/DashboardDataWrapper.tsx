import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser.id;
      
      if (!userId) { 
        setLoading(false); 
        return; 
      }

      try {
        const response = await fetch(`http://localhost:3000/api/get-lgu-data/${userId}`);
        
        if (response.ok) {
          const dbData = await response.json();

          const safeArray = (val: any) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim() !== "") {
              try { return JSON.parse(val); } catch { return []; }
            }
            return [];
          };

          // Merging logic - FIXED TO PRESERVE IMAGE
          setProfileData({
            ...initialProfileData,
            // 1. Basic Info
            basicInfo: {
              ...initialProfileData.basicInfo,
              name: dbData.basicInfo?.name || initialProfileData.basicInfo.name,
              province: dbData.basicInfo?.province || initialProfileData.basicInfo.province,
              region: dbData.basicInfo?.region || initialProfileData.basicInfo.region,
              population: dbData.basicInfo?.population || "",
              landArea: dbData.basicInfo?.land_area || "", 
              barangays: dbData.basicInfo?.barangays || "",
              religions: dbData.basicInfo?.religion || "", 
              languages: dbData.basicInfo?.languages || "",
              economicActivities: dbData.basicInfo?.economic_activities || "" 
            },
            // 2. Officials
            officials: {
              ...initialProfileData.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.vice_mayor || "", 
              tourismOfficer: dbData.officials?.tourism_officer || "", 
              planningCoordinator: dbData.officials?.planning_coordinator || "",
              council: safeArray(dbData.officials?.council).length > 0 
                ? safeArray(dbData.officials.council) 
                : initialProfileData.officials.council,
            },
            // 3. Tourism Assets - CRITICAL FIX HERE
            tourismAssets: {
              ...initialProfileData.tourismAssets,
              attractions: safeArray(dbData.tourismAssets?.attractions),
              accommodations: safeArray(dbData.tourismAssets?.accommodations),
              facilities: safeArray(dbData.tourismAssets?.facilities),
              // We check every possible key the backend might send
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
            // 5. Institutional Data
            ...dbData.institutional 
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
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