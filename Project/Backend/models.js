import db from './db.js';

export const LGUModel = {
  // Authentication
  findByEmail: (email) => 
    db.query('SELECT * FROM users WHERE email = $1', [email]),

  createUser: (email, password) => 
    db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email', [email, password]),

  // Fetching Data
  getAllData: async (userId) => {
    const queries = [
      db.query('SELECT * FROM lgu_basic_info WHERE user_id = $1', [userId]),
      db.query('SELECT * FROM lgu_officials WHERE user_id = $1', [userId]),
      db.query('SELECT * FROM lgu_tourism_assets WHERE user_id = $1', [userId]),
      db.query('SELECT * FROM transportation WHERE user_id = $1', [userId]),
      db.query('SELECT * FROM institutional_data WHERE user_id = $1', [userId]),
      db.query('SELECT * FROM lgu_safety WHERE user_id = $1', [userId])
    ];
    return Promise.all(queries);
  },

  // Saving Data
  saveBasic: (data) => {
    const { user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities } = data;
    return db.query(`
      INSERT INTO lgu_basic_info (user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (user_id) DO UPDATE SET 
        name = EXCLUDED.name, 
        province = EXCLUDED.province, 
        region = EXCLUDED.region, 
        land_area = EXCLUDED.land_area, 
        barangays = EXCLUDED.barangays, 
        population = EXCLUDED.population, 
        languages = EXCLUDED.languages, 
        religion = EXCLUDED.religion, 
        economic_activities = EXCLUDED.economic_activities`,
      [user_id, name || "", province || "", region || "", land_area || "", barangays || "", population || "", languages || "", religion || "", economic_activities || ""]
    );
  },

  saveOfficials: (data) => {
    const { user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, sk_federation_president, council, sk_members } = data;
    return db.query(`
      INSERT INTO lgu_officials (user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, sk_federation_president, council, sk_members)
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET 
        mayor = EXCLUDED.mayor, 
        vice_mayor = EXCLUDED.vice_mayor, 
        tourism_officer = EXCLUDED.tourism_officer, 
        planning_coordinator = EXCLUDED.planning_coordinator, 
        sk_federation_president = EXCLUDED.sk_federation_president, 
        council = EXCLUDED.council, 
        sk_members = EXCLUDED.sk_members`,
      [
        user_id, 
        mayor || "", 
        vice_mayor || "", 
        tourism_officer || "", 
        planning_coordinator || "", 
        sk_federation_president || "", 
        JSON.stringify(council || []), 
        JSON.stringify(sk_members || [])
      ]
    );
  },

  saveTourism: (user_id, attractions, tourismMap) => 
    db.query(`
      INSERT INTO lgu_tourism_assets (user_id, attractions, tourism_map)
      VALUES ($1, $2::jsonb, $3)
      ON CONFLICT (user_id) DO UPDATE SET 
        attractions = EXCLUDED.attractions, 
        tourism_map = EXCLUDED.tourism_map`,
      [user_id, JSON.stringify(attractions || []), tourismMap || ""]
    ),

  saveAccommodations: (user_id, accommodations, accommodation_profile) => 
    db.query(`
      INSERT INTO lgu_tourism_assets (user_id, accommodations, facilities)
      VALUES ($1, $2::jsonb, $3::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET 
        accommodations = EXCLUDED.accommodations, 
        facilities = EXCLUDED.facilities 
      RETURNING *`,
      [user_id, JSON.stringify(accommodations || []), JSON.stringify(accommodation_profile || [])]
    ),

  saveTransport: (user_id, list) => 
    db.query(`
      INSERT INTO transportation (user_id, list)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET 
        list = EXCLUDED.list 
      RETURNING *`,
      [user_id, JSON.stringify(list || [])]
    ),

  saveInstitutional: (user_id, data) => 
    db.query(`
      INSERT INTO institutional_data (user_id, data)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET 
        data = EXCLUDED.data`,
      [user_id, JSON.stringify(data || {})]
    ),

  saveSafety: (user_id, crimeIncidents, hazardMatrix) => 
    db.query(`
      INSERT INTO lgu_safety (user_id, crime_incidents, hazard_matrix)
      VALUES ($1, $2::jsonb, $3::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET 
        crime_incidents = EXCLUDED.crime_incidents, 
        hazard_matrix = EXCLUDED.hazard_matrix`,
      [user_id, JSON.stringify(crimeIncidents || {}), JSON.stringify(hazardMatrix || {})]
    )
};