import pool from './db.js';

export const LGUModel = {
  // Authentication
  findByEmail: (email) => 
    pool.query('SELECT * FROM users WHERE email = $1', [email]),

  createUser: (email, password) => 
    pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email', [email, password]),

  // Fetching Data
  getAllData: async (userId) => {
    const queries = [
      pool.query('SELECT * FROM lgu_basic_info WHERE user_id = $1', [userId]),
      pool.query('SELECT * FROM lgu_officials WHERE user_id = $1', [userId]),
      pool.query('SELECT * FROM lgu_tourism_assets WHERE user_id = $1', [userId]),
      pool.query('SELECT list FROM transportation WHERE user_id = $1', [userId]),
      pool.query('SELECT data FROM institutional_data WHERE user_id = $1', [userId]),
      pool.query('SELECT * FROM lgu_safety WHERE user_id = $1', [userId])
    ];
    return Promise.all(queries);
  },

  // Saving Data
  saveBasic: (data) => {
    const { user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities } = data;
    return pool.query(`
      INSERT INTO lgu_basic_info (user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (user_id) DO UPDATE SET 
      name=$2, province=$3, region=$4, land_area=$5, barangays=$6, population=$7, languages=$8, religion=$9, economic_activities=$10`,
      [user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities]
    );
  },

  saveOfficials: (data) => {
    const { user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, council } = data;
    return pool.query(`
      INSERT INTO lgu_officials (user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, council)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id) DO UPDATE SET 
      mayor=$2, vice_mayor=$3, tourism_officer=$4, planning_coordinator=$5, council=$6`,
      [user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, JSON.stringify(council)]
    );
  },

  saveTourism: (user_id, attractions, tourismMap) => 
    pool.query(`
      INSERT INTO lgu_tourism_assets (user_id, attractions, tourism_map)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) DO UPDATE SET 
      attractions = EXCLUDED.attractions, tourism_map = EXCLUDED.tourism_map, updated_at = CURRENT_TIMESTAMP`,
      [user_id, JSON.stringify(attractions || []), tourismMap]
    ),

  saveAccommodations: (user_id, accommodations, accommodation_profile) => 
    pool.query(`
      INSERT INTO lgu_tourism_assets (user_id, accommodations, facilities)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) DO UPDATE SET 
      accommodations = EXCLUDED.accommodations, facilities = EXCLUDED.facilities, updated_at = CURRENT_TIMESTAMP RETURNING *`,
      [user_id, JSON.stringify(accommodations || []), JSON.stringify(accommodation_profile || [])]
    ),

  saveTransport: (user_id, list) => 
    pool.query(`
      INSERT INTO transportation (user_id, list, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (user_id) DO UPDATE SET list = EXCLUDED.list, updated_at = NOW() RETURNING *`,
      [user_id, JSON.stringify(list || [])]
    ),

  saveInstitutional: (user_id, data) => 
    pool.query(`
      INSERT INTO institutional_data (user_id, data, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP`,
      [user_id, JSON.stringify(data)]
    ),

  saveSafety: (user_id, crimeIncidents, hazardMatrix) => 
    pool.query(`
      INSERT INTO lgu_safety (user_id, crime_incidents, hazard_matrix, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) DO UPDATE SET 
      crime_incidents = EXCLUDED.crime_incidents, hazard_matrix = EXCLUDED.hazard_matrix, updated_at = CURRENT_TIMESTAMP`,
      [user_id, JSON.stringify(crimeIncidents || {}), JSON.stringify(hazardMatrix || {})]
    )
};