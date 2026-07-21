getLguData: async (req, res) => {
  const { userId } = req.params;
  try {
    const [basicInfo, officials, tourism, transport, institutional, safety] = await LGUModel.getAllData(userId);
    
    const b = basicInfo.rows[0] || {};
    const o = officials.rows[0] || {};
    const t = tourism.rows[0] || {};
    const tr = transport.rows[0] || {};
    const inst = institutional.rows[0]?.data || {};
    const s = safety.rows[0] || {};

    res.json({
      // Map SQL snake_case column names into camelCase for BasicInfo.tsx and ProfileData
      basicInfo: {
        name: b.name || "",
        province: b.province || "",
        region: b.region || "",
        landArea: b.land_area || b.landArea || "",
        land_area: b.land_area || b.landArea || "",
        barangays: b.barangays || "",
        population: b.population || "",
        languages: b.languages || "",
        religions: b.religion || b.religions || "",
        religion: b.religion || b.religions || "",
        economicActivities: b.economic_activities || b.economicActivities || "",
        economic_activities: b.economic_activities || b.economicActivities || ""
      },

      // Map SQL snake_case column names into camelCase for Officials
      officials: {
        mayor: o.mayor || "",
        viceMayor: o.vice_mayor || o.viceMayor || "",
        vice_mayor: o.vice_mayor || o.viceMayor || "",
        tourismOfficer: o.tourism_officer || o.tourismOfficer || "",
        tourism_officer: o.tourism_officer || o.tourismOfficer || "",
        planningCoordinator: o.planning_coordinator || o.planningCoordinator || "",
        planning_coordinator: o.planning_coordinator || o.planningCoordinator || "",
        skFederationPresident: o.sk_federation_president || o.skFederationPresident || "",
        sk_federation_president: o.sk_federation_president || o.skFederationPresident || "",
        council: o.council || Array(10).fill(""),
        skMembers: o.sk_members || o.skMembers || []
      },

      tourismAssets: {
        attractions: t.attractions || [],
        accommodations: t.accommodations || [],
        facilities: t.facilities || [],
        tourismMap: t.tourism_map || t.tourismMap || ""
      },

      transportation: {
        list: tr.list || []
      },

      institutional: {
        laborForce: inst.laborForce || inst.labor_force || {},
        revenueData: inst.revenueData || inst.revenue_data || {},
        emergencyContacts: inst.emergencyContacts || inst.emergency_contacts || [],
        tourismEducation: inst.tourismEducation || inst.tourism_education || [],
        tourismProjects: inst.tourismProjects || inst.tourism_projects || [],
        institutionalFacilities: inst.institutionalFacilities || inst.facilities || []
      },

      crimeIncidents: s.crime_incidents || s.crimeIncidents || inst.crimeIncidents || {},
      hazardMatrix: s.hazard_matrix || s.hazardMatrix || inst.hazardMatrix || {}
    });
  } catch (err) {
    console.error("❌ GET DATA ERROR:", err.message);
    res.status(500).json({ error: "FETCH FAILED", details: err.message });
  }
}