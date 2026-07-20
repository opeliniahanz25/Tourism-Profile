import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { initialProfileData, type ProfileData } from '../../data/profileData';

export function useAdminData() {
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);

  // --- 1. LOAD DATA FROM DATABASE ---
  useEffect(() => {
    const loadFromDatabase = async () => {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = storedUser.id;
      
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // ✅ FIXED: Removed absolute 'http://localhost:3000' domain for relative production requests
        const response = await fetch(`/api/get-lgu-data/${userId}`);
        if (response.ok) {
          const dbData = await response.json();
          
          setEditData((prev: any) => ({
            ...prev,
            basicInfo: {
              ...prev.basicInfo,
              name: dbData.basicInfo?.name || "",
              province: dbData.basicInfo?.province || "",
              region: dbData.basicInfo?.region || "",
              landArea: dbData.basicInfo?.land_area || "", 
              barangays: dbData.basicInfo?.barangays || "",
              population: dbData.basicInfo?.population || "",
              languages: dbData.basicInfo?.languages || "",
              religions: dbData.basicInfo?.religion || dbData.basicInfo?.religions || "", 
              economicActivities: dbData.basicInfo?.economic_activities || "" 
            },
            officials: {
              ...prev.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.vice_mayor || dbData.officials?.viceMayor || "", 
              tourismOfficer: dbData.officials?.tourism_officer || dbData.officials?.tourismOfficer || "", 
              planningCoordinator: dbData.officials?.planning_coordinator || dbData.officials?.planningCoordinator || "",
              skFederationPresident: dbData.officials?.sk_federation_president || "",
              council: Array.isArray(dbData.officials?.council) ? dbData.officials.council : prev.officials.council,
              skMembers: Array.isArray(dbData.officials?.sk_members) ? dbData.officials.sk_members : []
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
              list: dbData.transportation?.list || dbData.transportation || []
            },
            // ✅ EXTRA NUANCE: Explicitly map data structures back down onto structural schema layers safely
            institutional: dbData.institutional && Object.keys(dbData.institutional).length > 0 
                ? {
                    ...dbData.institutional,
                    labor_force: dbData.institutional.labor_force || dbData.institutional.laborForce || {},
                    revenue_data: dbData.institutional.revenue_data || dbData.institutional.revenueData || {}
                  } 
                : prev.institutional,
            crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || prev.crimeIncidents || {},
            hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || prev.hazardMatrix || {}
          }));
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("COULD NOT LOAD SAVED DATA");
      } finally {
        setLoading(false);
      }
    };
    loadFromDatabase();
  }, []);

  // --- 2. SAVE ALL DATA TO DATABASE ---
  const handleSave = async (activeTab: string, onSaveSuccess?: () => void) => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (!userId) return toast.error("LOGIN REQUIRED");

    try {
      let endpoint = '';
      let payload: any = { user_id: userId };
      const data = editData as any;

      if (activeTab === "Basic Info") {
        endpoint = '/api/save-basic-info';
        payload = { 
          ...payload,
          name: data.basicInfo.name,
          province: data.basicInfo.province,
          region: data.basicInfo.region,
          land_area: data.basicInfo.landArea,
          barangays: data.basicInfo.barangays,
          population: data.basicInfo.population,
          languages: data.basicInfo.languages,
          religion: data.basicInfo.religions || data.basicInfo.religion,
          economic_activities: data.basicInfo.economicActivities
        };
      } 
      else if (activeTab === "Officials") {
        endpoint = '/api/save-officials';
        payload = { 
          user_id: userId,
          mayor: data.officials.mayor,
          vice_mayor: data.officials.viceMayor || data.officials.vice_mayor,
          tourism_officer: data.officials.tourismOfficer || data.officials.tourism_officer,
          planning_coordinator: data.officials.planningCoordinator || data.officials.planning_coordinator,
          sk_federation_president: data.officials.skFederationPresident || "",
          council: data.officials.council,
          sk_members: data.officials.skMembers || []
        };
      } 
      else if (activeTab === "Attractions") {
        endpoint = '/api/save-tourism-assets';
        payload = { 
          user_id: userId, 
          attractions: data.tourismAssets.attractions, 
          tourismMap: data.tourismAssets.tourismMap || data.tourismAssets.tourism_map 
        };
      }
      else if (activeTab === "Accommodation") {
        endpoint = '/api/save-accommodations';
        payload = { 
          user_id: userId, 
          accommodations: data.tourismAssets.accommodations,
          accommodation_profile: data.tourismAssets.facilities || data.tourismAssets.accommodation_profile 
        };
      }
      else if (activeTab === "Transport") {
        endpoint = '/api/save-transport';
        payload = { user_id: userId, list: data.transportation.list || data.transportation };
      }
      else if (activeTab === "Institutional") {
        endpoint = '/api/save-institutional';
        payload = {
          user_id: userId,
          data: {
            ...data.institutional,
            labor_force: data.institutional?.labor_force || data.institutional?.laborForce,
            revenue_data: data.institutional?.revenue_data || data.institutional?.revenueData
          }
        };
      }
      else if (activeTab === "Safety") {
        endpoint = '/api/save-safety';
        payload = { 
          user_id: userId, 
          crimeIncidents: data.crimeIncidents || data.crime_incidents, 
          hazardMatrix: data.hazardMatrix || data.hazard_matrix 
        };
      }

      // ✅ FIXED: Removed 'http://localhost:3000' absolute path for relative operations tracking
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`${activeTab.toUpperCase()} SAVED!`);
        onSaveSuccess?.();
      } else {
        const errJson = await res.json();
        toast.error(`SAVE FAILED: ${errJson.error}`);
      }
    } catch (err) {
      toast.error("CONNECTION TO SERVER FAILED");
    }
  };

  return { editData, setEditData, handleSave, loading };
}