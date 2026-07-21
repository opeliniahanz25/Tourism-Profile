import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { initialProfileData, type ProfileData } from '../../data/profileData';

export default function DashboardDataWrapper() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const loadFromDatabase = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser?.id;

    if (!userId) {
      console.warn("⚠️ No User ID found in localStorage");
      setLoading(false);
      return;
    }

    try {
      // 🚨 CRITICAL FIX: Relative URL (/api/...) instead of http://localhost:3000/api/...
      const response = await fetch(`/api/get-lgu-data/${userId}`);

      if (response.ok) {
        const dbData = await response.json();

        const b = dbData.basicInfo || {};
        const o = dbData.officials || {};
        const t = dbData.tourismAssets || {};
        const tr = dbData.transportation || {};
        const inst = dbData.institutional || {};

        setProfileData({
          basicInfo: {
            name: b.name || initialProfileData.basicInfo.name,
            province: b.province || initialProfileData.basicInfo.province,
            region: b.region || initialProfileData.basicInfo.region,
            population: b.population || "",
            landArea: b.landArea || b.land_area || "",
            barangays: b.barangays || "",
            religions: b.religions || b.religion || "",
            languages: b.languages || "",
            economicActivities: b.economicActivities || b.economic_activities || ""
          },
          officials: {
            mayor: o.mayor || "",
            viceMayor: o.viceMayor || o.vice_mayor || "",
            tourismOfficer: o.tourismOfficer || o.tourism_officer || "",
            planningCoordinator: o.planningCoordinator || o.planning_coordinator || "",
            skFederationPresident: o.skFederationPresident || o.sk_federation_president || "",
            council: Array.isArray(o.council) ? o.council : initialProfileData.officials.council,
            skMembers: Array.isArray(o.skMembers) ? o.skMembers : (Array.isArray(o.sk_members) ? o.sk_members : [])
          },
          tourismAssets: {
            attractions: Array.isArray(t.attractions) ? t.attractions : [],
            accommodations: Array.isArray(t.accommodations) ? t.accommodations : [],
            facilities: Array.isArray(t.facilities) ? t.facilities : (Array.isArray(t.accommodation_profile) ? t.accommodation_profile : []),
            tourismMap: t.tourismMap || t.tourism_map || ""
          },
          transportation: {
            list: Array.isArray(tr.list) ? tr.list : (Array.isArray(tr) ? tr : [])
          },
          institutional: {
            institutionalFacilities: inst.institutionalFacilities || inst.facilities || [],
            laborForce: inst.laborForce || inst.labor_force || {},
            revenueData: inst.revenueData || inst.revenue_data || {},
            revenueYears: inst.revenueYears || ['y1', 'y2', 'y3']
          },
          crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || inst.crimeIncidents || inst.crime_incidents || {},
          hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || inst.hazardMatrix || inst.hazard_matrix || {}
        });
      }
    } catch (error) {
      console.error("❌ Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromDatabase();

    const handleFocus = () => loadFromDatabase();
    const handleDbUpdate = () => loadFromDatabase();

    window.addEventListener('focus', handleFocus);
    window.addEventListener('db_data_updated', handleDbUpdate);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('db_data_updated', handleDbUpdate);
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