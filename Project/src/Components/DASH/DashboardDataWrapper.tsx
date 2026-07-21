import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Triggers re-fetch on route change!

  const loadFromDatabase = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser?.id;

    if (!userId) {
      console.warn("⚠️ No User ID found in localStorage");
      setLoading(false);
      return;
    }

    try {
      // Relative API path works both locally and on Render production
      const response = await fetch(`/api/get-lgu-data/${userId}`);

      if (response.ok) {
        const dbData = await response.json();

        setProfileData((prev: any) => ({
          ...prev,

          // 1. Basic Info
          basicInfo: {
            ...prev.basicInfo,
            name: dbData.basicInfo?.name || "",
            province: dbData.basicInfo?.province || "",
            region: dbData.basicInfo?.region || "",
            landArea: dbData.basicInfo?.landArea || dbData.basicInfo?.land_area || "", 
            barangays: dbData.basicInfo?.barangays || "",
            population: dbData.basicInfo?.population || "",
            languages: dbData.basicInfo?.languages || "",
            religions: dbData.basicInfo?.religions || dbData.basicInfo?.religion || "", 
            economicActivities: dbData.basicInfo?.economicActivities || dbData.basicInfo?.economic_activities || "" 
          },

          // 2. Officials
          officials: {
            ...prev.officials,
            mayor: dbData.officials?.mayor || "",
            viceMayor: dbData.officials?.viceMayor || dbData.officials?.vice_mayor || "", 
            tourismOfficer: dbData.officials?.tourismOfficer || dbData.officials?.tourism_officer || "", 
            planningCoordinator: dbData.officials?.planningCoordinator || dbData.officials?.planning_coordinator || "",
            skFederationPresident: dbData.officials?.skFederationPresident || dbData.officials?.sk_federation_president || "",
            council: Array.isArray(dbData.officials?.council) ? dbData.officials.council : Array(10).fill(""),
            skMembers: Array.isArray(dbData.officials?.skMembers) 
              ? dbData.officials.skMembers 
              : Array.isArray(dbData.officials?.sk_members) 
              ? dbData.officials.sk_members 
              : []
          },

          // 3. Tourism Assets
          tourismAssets: {
            ...prev.tourismAssets,
            attractions: dbData.tourismAssets?.attractions || [],
            accommodations: dbData.tourismAssets?.accommodations || [],
            facilities: dbData.tourismAssets?.facilities || dbData.tourismAssets?.accommodation_profile || [],
            tourismMap: dbData.tourismAssets?.tourismMap || dbData.tourismAssets?.tourism_map || ""
          },

          // 4. Transportation
          transportation: {
            ...prev.transportation,
            list: Array.isArray(dbData.transportation?.list) 
              ? dbData.transportation.list 
              : Array.isArray(dbData.transportation) 
              ? dbData.transportation 
              : []
          },

          // 5. Institutional
          institutional: {
            laborForce: dbData.institutional?.laborForce || dbData.institutional?.labor_force || prev.institutional?.laborForce || {},
            revenueData: dbData.institutional?.revenueData || dbData.institutional?.revenue_data || prev.institutional?.revenueData || {},
            emergencyContacts: dbData.institutional?.emergencyContacts || dbData.institutional?.emergency_contacts || prev.institutional?.emergencyContacts || [],
            tourismEducation: dbData.institutional?.tourismEducation || dbData.institutional?.tourism_education || prev.institutional?.tourismEducation || [],
            tourismProjects: dbData.institutional?.tourismProjects || dbData.institutional?.tourism_projects || prev.institutional?.tourismProjects || []
          },

          // 6. Safety & Hazard Matrix
          crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || dbData.institutional?.crimeIncidents || dbData.institutional?.crime_incidents || prev.crimeIncidents || {},
          hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || dbData.institutional?.hazardMatrix || dbData.institutional?.hazard_matrix || prev.hazardMatrix || {}
        }));
      }
    } catch (error) {
      console.error("❌ Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch whenever location (path) changes or tab gains focus
  useEffect(() => {
    loadFromDatabase();

    const handleFocus = () => loadFromDatabase();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [location.pathname, loadFromDatabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black animate-pulse uppercase tracking-widest text-blue-600 bg-white">
        Syncing LGU Data...
      </div>
    );
  }

  return <AdminDashboard profileData={profileData} />;
}