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

          // Merging logic - PRESERVE IMAGE AND MATCH BACKEND SNAKE_CASE
          setProfileData({
            ...initialProfileData,
            // 1. Basic Info
            basicInfo: {
              ...initialProfileData.basicInfo,
              name: dbData.basicInfo?.name || initialProfileData.basicInfo.name,
              province: dbData.basicInfo?.province || initialProfileData.basicInfo.province,
              region: dbData.basicInfo?.region || initialProfileData.basicInfo.region,
              population: dbData.basicInfo?.population || "",
              landArea: dbData.basicInfo?.land_area || dbData.basicInfo?.landArea || "", 
              barangays: dbData.basicInfo?.barangays || "",
              religions: dbData.basicInfo?.religion || dbData.basicInfo?.religions || "", 
              languages: dbData.basicInfo?.languages || "",
              economicActivities: dbData.basicInfo?.economic_activities || dbData.basicInfo?.economicActivities || "" 
            },
            // 2. Officials
            officials: {
              ...initialProfileData.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.vice_mayor || dbData.officials?.viceMayor || "", 
              tourismOfficer: dbData.officials?.tourism_officer || dbData.officials?.tourismOfficer || "", 
              planningCoordinator: dbData.officials?.planning_coordinator || dbData.officials?.planningCoordinator || "",
              council: safeArray(dbData.officials?.council).length > 0 
                ? safeArray(dbData.officials.council) 
                : initialProfileData.officials.council,
            },
            // 3. Tourism Assets
            tourismAssets: {
              ...initialProfileData.tourismAssets,
              attractions: safeArray(dbData.tourismAssets?.attractions),
              accommodations: safeArray(dbData.tourismAssets?.accommodations),
              facilities: safeArray(dbData.tourismAssets?.facilities || dbData.tourismAssets?.accommodation_profile),
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
            institutional: dbData.institutional && Object.keys(dbData.institutional).length > 0 
              ? {
                  ...dbData.institutional,
                  labor_force: dbData.institutional.labor_force || dbData.institutional.laborForce || {},
                  laborForce: dbData.institutional.laborForce || dbData.institutional.labor_force || {},
                  revenue_data: dbData.institutional.revenue_data || dbData.institutional.revenueData || {},
                  revenueData: dbData.institutional.revenueData || dbData.institutional.revenue_data || {},
                  emergency_contacts: dbData.institutional.emergency_contacts || dbData.institutional.emergencyContacts || [],
                  emergencyContacts: dbData.institutional.emergencyContacts || dbData.institutional.emergency_contacts || [],
                  tourism_education: dbData.institutional.tourism_education || dbData.institutional.tourismEducation || [],
                  tourismEducation: dbData.institutional.tourismEducation || dbData.institutional.tourism_education || [],
                  tourism_projects: dbData.institutional.tourism_projects || dbData.institutional.tourismProjects || [],
                  tourismProjects: dbData.institutional.tourismProjects || dbData.institutional.tourism_projects || []
                }
              : initialProfileData.institutional,
            // 6. Safety Data
            crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || {},
            hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || {}
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        // ✅ FIXED: Changed from 'private finally' to standard 'finally' block
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