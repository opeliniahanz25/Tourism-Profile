import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { initialProfileData, type ProfileData } from '../../data/profileData';

export function useAdminData() {
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);
  const [loading, setLoading] = useState(true);

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
        const response = await fetch(`http://localhost:3000/api/get-lgu-data/${userId}`);
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
              religions: dbData.basicInfo?.religion || "", 
              economicActivities: dbData.basicInfo?.economic_activities || "" 
            },
            officials: {
              ...prev.officials,
              mayor: dbData.officials?.mayor || "",
              viceMayor: dbData.officials?.vice_mayor || "", 
              tourismOfficer: dbData.officials?.tourism_officer || "", 
              planningCoordinator: dbData.officials?.planning_coordinator || "",
              skFederationPresident: dbData.officials?.sk_federation_president || "",
              council: Array.isArray(dbData.officials?.council) ? dbData.officials.council : prev.officials.council,
              skMembers: Array.isArray(dbData.officials?.sk_members) ? dbData.officials.sk_members : []
            },
            tourismAssets: {
              ...prev.tourismAssets,
              attractions: dbData.tourismAssets?.attractions || [],
              accommodations: dbData.tourismAssets?.accommodations || [],
              // This matches the key sent by our new server GET route
              facilities: dbData.tourismAssets?.facilities || [],
              // Fix naming: db uses tourism_map, frontend uses tourismMap
              tourismMap: dbData.tourismAssets?.tourismMap || dbData.tourismAssets?.tourism_map || ""
            },
            transportation: {
              ...prev.transportation,
              list: dbData.transportation?.list || []
            }
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
          religion: data.basicInfo.religions,
          economic_activities: data.basicInfo.economicActivities
        };
      } 
      else if (activeTab === "Officials") {
        endpoint = '/api/save-officials';
        payload = { 
          user_id: userId,
          mayor: data.officials.mayor,
          vice_mayor: data.officials.viceMayor,
          tourism_officer: data.officials.tourismOfficer,
          planning_coordinator: data.officials.planningCoordinator,
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
          tourismMap: data.tourismAssets.tourismMap 
        };
      }
      else if (activeTab === "Accommodation") {
  endpoint = '/api/save-accommodations';
  payload = { 
    user_id: userId, 
    accommodations: data.tourismAssets.accommodations, // Section C
    accommodation_profile: data.tourismAssets.facilities // Section D
  };
}
      else if (activeTab === "Transport") {
        endpoint = '/api/save-transport';
        payload = { user_id: userId, list: data.transportation.list };
      }

      // Inside useAdminData's handleSave function
else if (activeTab === "Safety") {
  endpoint = '/api/save-safety';
  payload = { 
    user_id: userId, 
    crimeIncidents: data.crimeIncidents, 
    hazardMatrix: data.hazardMatrix 
  };
}

      const res = await fetch(`http://localhost:3000${endpoint}`, {
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