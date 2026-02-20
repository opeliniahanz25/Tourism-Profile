export interface ProfileData {
  basicInfo: any;
  officials: {
    mayor: string;
    viceMayor: string;
    council: string[];
    tourismOfficer: string;
    planningCoordinator: string;
  };
  tourismAssets: {
    attractions: any[];
    accommodations: any[];
    profiles: any[];
  };
  transportation: any[];
  institutional: any;
}

export const initialProfileData: ProfileData = {
  basicInfo: {
    name: "PANGLAO",
    province: "BOHOL",
    region: "REGION VII",
    population: "",
    landArea: "",
    barangays: "",
    ethnicGroups: "",
    religions: "",
    languages: "",
    economicActivities: ""
  },
  officials: {
    mayor: "",
    viceMayor: "",
    council: ["", "", "", "", "", "", "", ""],
    tourismOfficer: "",
    planningCoordinator: ""
  },
  tourismAssets: {
    attractions: [],
    accommodations: [],
    profiles: []
  },
  transportation: [],
  institutional: {}
};