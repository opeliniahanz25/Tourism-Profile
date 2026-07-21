import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

const parseArray = (input: any): any[] => {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string' && input.trim() !== '') {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const loadFromDatabase = useCallback(async () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser?.id;

    if (!userId) {
      console.warn("⚠️ No User ID found in localStorage!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/get-lgu-data/${userId}`);

      if (response.ok) {
        const dbData = await response.json();

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
            council: parseArray(dbData.officials?.council).length > 0 ? parseArray(dbData.officials?.council) : Array(10).fill(""),
            skMembers: parseArray(dbData.officials?.sk_members || dbData.officials?.skMembers)
          },
          tourismAssets: {
            ...prev.tourismAssets,
            attractions: parseArray(dbData.tourismAssets?.attractions),
            accommodations: parseArray(dbData.tourismAssets?.accommodations),
            facilities: parseArray(dbData.tourismAssets?.facilities),
            tourismMap: dbData.tourismAssets?.tourismMap || dbData.tourismAssets?.tourism_map || ""
          },
          transportation: {
            ...prev.transportation,
            list: parseArray(dbData.transportation?.list || dbData.transportation)
          },
          institutional: dbData.institutional && Object.keys(dbData.institutional).length > 0 
            ? dbData.institutional 
            : prev.institutional,
          crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || prev.crimeIncidents || {},
          hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || prev.hazardMatrix || {}
        }));
      }
    } catch (error) {
      console.error("❌ Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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