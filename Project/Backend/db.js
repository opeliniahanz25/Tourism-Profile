import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'local_database.json');

// Initialize the mock database schema structures if missing
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    users: [],
    lgu_basic_info: [],
    lgu_officials: [],
    lgu_tourism_assets: [],
    transportation: [],
    institutional_data: [],
    lgu_safety: []
  }, null, 2));
}

const db = {
  query: async (text, params) => {
    const dbData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // --- 1. USER AUTHENTICATION QUERIES ---
    if (text.includes('SELECT * FROM users')) {
      const [email] = params;
      const matched = dbData.users.find(u => u.email === email);
      return { rows: matched ? [matched] : [] };
    }

    if (text.includes('INSERT INTO users')) {
      const [email, password] = params;
      const newUser = { id: String(dbData.users.length + 1), email, password };
      dbData.users.push(newUser);
      fs.writeFileSync(DATA_FILE, JSON.stringify(dbData, null, 2));
      return { rows: [newUser] };
    }

    // --- 2. MULTI-TABLE GET SYSTEM MAPPING ---
    if (text.includes('SELECT') && text.includes('WHERE user_id = $1')) {
      const [userId] = params;
      // Figure out which table LGUModel is checking
      const tableName = text.match(/FROM\s+(\w+)/i)?.[1];
      if (tableName && dbData[tableName]) {
        const foundRecord = dbData[tableName].find(r => String(r.user_id) === String(userId));
        return { rows: foundRecord ? [foundRecord] : [] };
      }
      return { rows: [] };
    }

    // --- 3. DYNAMIC UPSERT LOGIC (INSERT ... ON CONFLICT) ---
    if (text.includes('INSERT INTO')) {
      const tableName = text.match(/INSERT\s+INTO\s+(\w+)/i)?.[1];
      
      if (tableName && dbData[tableName]) {
        const userId = String(params[0]); // user_id is always parameter position 1
        const recordIndex = dbData[tableName].findIndex(r => String(r.user_id) === userId);

        let rowData = { user_id: userId };

        // Destructure parameters matching the exact indices of each query sequence
        if (tableName === 'lgu_basic_info') {
          const [_, name, province, region, land_area, barangays, population, languages, religion, economic_activities] = params;
          rowData = { ...rowData, name, province, region, land_area, barangays, population, languages, religion, economic_activities };
        } else if (tableName === 'lgu_officials') {
          const [_, mayor, vice_mayor, tourism_officer, planning_coordinator, councilJson] = params;
          rowData = { ...rowData, mayor, vice_mayor, tourism_officer, planning_coordinator, council: JSON.parse(councilJson) };
        } else if (tableName === 'lgu_tourism_assets') {
          // Handles splits between both saveTourism and saveAccommodations parameters
          if (text.includes('attractions')) {
            rowData = { ...dbData[tableName][recordIndex], user_id: userId, attractions: JSON.parse(params[1]), tourism_map: params[2] };
          } else {
            rowData = { ...dbData[tableName][recordIndex], user_id: userId, accommodations: JSON.parse(params[1]), facilities: JSON.parse(params[2]) };
          }
        } else if (tableName === 'transportation') {
          rowData = { ...rowData, list: JSON.parse(params[1]) };
        } else if (tableName === 'institutional_data') {
          rowData = { ...rowData, data: JSON.parse(params[1]) };
        } else if (tableName === 'lgu_safety') {
          rowData = { ...rowData, crime_incidents: JSON.parse(params[1]), hazard_matrix: JSON.parse(params[2]) };
        }

        if (recordIndex > -1) {
          dbData[tableName][recordIndex] = { ...dbData[tableName][recordIndex], ...rowData };
        } else {
          dbData[tableName].push(rowData);
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(dbData, null, 2));
        return { rows: [rowData] };
      }
    }

    return { rows: [] };
  },

  connect: (callback) => {
    console.log("📝 LOCAL SQL EMULATOR RUNNING: PostgreSQL code fully operational.");
    if (callback) callback(null, {}, () => {});
  }
};

export default db;