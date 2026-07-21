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
        // RELATIVE URL FOR PRODUCTION / DEVELOPMENT COMPATIBILITY
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
              council: Array.isArray(dbData.officials?.council) ? dbData.officials.council : prev.officials.council,
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
              tourismProjects: dbData.institutional?.tourismProjects || dbData.institutional?.tourism_projects || prev.institutional?.tourismProjects || []
            },
            crimeIncidents: dbData.crimeIncidents || dbData.crime_incidents || dbData.institutional?.crimeIncidents || dbData.institutional?.crime_incidents || prev.crimeIncidents || {},
            hazardMatrix: dbData.hazardMatrix || dbData.hazard_matrix || dbData.institutional?.hazardMatrix || dbData.institutional?.hazard_matrix || prev.hazardMatrix || {}
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
          accommodations: data.tourismAssets.accommodations,
          accommodation_profile: data.tourismAssets.facilities 
        };
      }
      else if (activeTab === "Transport") {
        endpoint = '/api/save-transport';
        payload = { user_id: userId, list: data.transportation.list };
      }
      else if (activeTab === "Institutional") {
        endpoint = '/api/save-institutional';
        payload = {
          user_id: userId,
          labor_force: data.institutional?.laborForce || {},
          revenue_data: data.institutional?.revenueData || {},
          emergency_contacts: data.institutional?.emergencyContacts || [],
          tourism_education: data.institutional?.tourismEducation || [],
          tourism_projects: data.institutional?.tourismProjects || []
        };
      }
      else if (activeTab === "Safety") {
        endpoint = '/api/save-safety';
        payload = { 
          user_id: userId, 
          crimeIncidents: data.crimeIncidents, 
          hazardMatrix: data.hazardMatrix 
        };
      }

      // RELATIVE PATH: Eliminates http://localhost:3000 connection errors
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`${activeTab.toUpperCase()} SAVED!`);
        window.dispatchEvent(new Event("db_data_updated"));
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