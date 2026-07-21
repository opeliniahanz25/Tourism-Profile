import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // --- EXACT FETCH METHOD FROM ADMIN PANEL ---
  const loadFromDatabase = useCallback(async () => {
    setLoading(true);
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
        
        // Exact state mapping logic mirrored from AdminPanel
        setProfileData((prev: any) => ({
          ...prev,
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
          tourismAssets: {
            ...prev.tourismAssets,
            attractions: dbData.tourismAssets?.attractions || [],
            accommodations: dbData.tourismAssets?.accommodations || [],
            facilities: dbData.tourismAssets?.facilities || dbData.tourismAssets?.accommodation_profile || [],
            tourismMap: dbData.tourismAssets?.tourismMap || dbData.tourismAssets?.tourism_map || ""
          },
          transportation: {
            ...prev.transportation,
            list: Array.isArray(dbData.transportation?.list) 
              ? dbData.transportation.list 
              : Array.isArray(dbData.transportation) 
              ? dbData.transportation 
              : []
          },
          institutional: {
            laborForce: dbData.institutional?.laborForce || dbData.institutional?.labor_force || prev.institutional?.laborForce || {},
            revenueData: dbData.institutional?.revenueData || dbData.institutional?.revenue_data || prev.institutional?.revenueData || {},
            emergencyContacts: dbData.institutional?.emergencyContacts || dbData.institutional?.emergency_contacts || prev.institutional?.emergencyContacts || [],
            tourismEducation: dbData.institutional?.tourismEducation || dbData.institutional?.tourism_education || prev.institutional?.tourismEducation || [],
            tourismProjects: dbData.institutional?.tourismProjects || dbData.institutional?.tourism_projects || prev.institutional?.tourismProjects || [],
            institutionalFacilities: dbData.institutional?.institutionalFacilities || dbData.institutional?.facilities || prev.institutional?.institutionalFacilities || []
          },
          crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || dbData.institutional?.crimeIncidents || dbData.institutional?.crime_incidents || prev.crimeIncidents || {},
          hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || dbData.institutional?.hazardMatrix || dbData.institutional?.hazard_matrix || prev.hazardMatrix || {}
        }));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync on mount, page route change, tab focus, or custom save event
  useEffect(() => {
    loadFromDatabase();

    const handleSync = () => loadFromDatabase();
    window.addEventListener('focus', handleSync);
    window.addEventListener('db_data_updated', handleSync);

    return () => {
      window.removeEventListener('focus', handleSync);
      window.removeEventListener('db_data_updated', handleSync);
    };
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