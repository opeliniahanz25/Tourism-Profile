export interface ProfileData {
  basicInfo: {
    name: string; province: string; region: string; population: string;
    landArea: string; barangays: string; religions: string; languages: string;
    economicActivities: string;
  };
  officials: {
    mayor: string;
    viceMayor: string;
    council: string[];
    tourismOfficer: string;
    planningCoordinator: string;
    skFederationPresident: string;
    skMembers: any[];
  };
  tourismAssets: { attractions: any[]; accommodations: any[]; facilities: any[]; tourismMap: string; };
  transportation: { list: any[]; };
  institutional: {
    institutionalFacilities: any[];
    laborForce: any;
    revenueData: any;
    revenueYears: string[];
  };
  // --- ADDED FOR SAFETY SYNC ---
  crimeIncidents: Record<string, string>;
  hazardMatrix: Record<string, any>;
}

export const initialProfileData: ProfileData = {
  basicInfo: { name: "", province: "", region: "", population: "", landArea: "", barangays: "", religions: "", languages: "", economicActivities: "" },
  officials: { mayor: "", viceMayor: "", council: Array(10).fill(""), tourismOfficer: "", planningCoordinator: "", skFederationPresident: "", skMembers: [] },
  tourismAssets: { attractions: [], accommodations: [], facilities: [], tourismMap: "" },
  transportation: { list: [] },
  institutional: {
    institutionalFacilities: [],
    laborForce: {},
    revenueData: {},
    revenueYears: ['y1', 'y2', 'y3']
  },
  // --- INITIALIZE SAFETY FIELDS ---
  crimeIncidents: {},
  hazardMatrix: {}
};