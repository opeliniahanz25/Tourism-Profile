import pg from 'pg';
const { Pool } = pg;
import express from 'express';
import cors from 'cors';

// --- 1. DATABASE CONNECTION ---
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'website_db',
  password: 'HANSOPELINIA',
  port: 20323, // Your specific PostgreSQL port
});

const app = express();

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 3. AUTHENTICATION ROUTES ---

// LOGIN ROUTE
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = userResult.rows[0];

        if (user.password === password) {
            res.json({ 
                message: "Login successful", 
                user: { id: user.id, email: user.email } 
            });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (err) {
        console.error("LOGIN ERROR:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, password]
        );
        res.json({ message: "User created!", user: newUser.rows[0] });
    } catch (err) {
        console.error("SIGNUP ERROR:", err.message);
        res.status(500).json({ error: "User already exists or database error" });
    }
});

// --- 4. LGU DATA ROUTES ---

app.get('/api/get-lgu-data/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const basicInfo = await pool.query('SELECT * FROM lgu_basic_info WHERE user_id = $1', [userId]);
        const officials = await pool.query('SELECT * FROM lgu_officials WHERE user_id = $1', [userId]);
        const tourism = await pool.query('SELECT * FROM lgu_tourism_assets WHERE user_id = $1', [userId]);
        const transport = await pool.query('SELECT list FROM transportation WHERE user_id = $1', [userId]);
        const institutional = await pool.query('SELECT data FROM institutional_data WHERE user_id = $1', [userId]);
        const safety = await pool.query('SELECT * FROM lgu_safety WHERE user_id = $1', [userId]);

        // Merge the safety data into the institutional object
        // This ensures the frontend "sees" it all in one place
        const mergedInstitutional = {
            ...(institutional.rows[0]?.data || {}),
            crimeIncidents: safety.rows[0]?.crime_incidents || {},
            hazardMatrix: safety.rows[0]?.hazard_matrix || {}
        };

        res.json({
            basicInfo: basicInfo.rows[0] || {},
            officials: officials.rows[0] || {},
            tourismAssets: tourism.rows[0] || {},
            transportation: {
                list: transport.rows[0]?.list || []
            },
            // Now, when the frontend spreads 'institutional', 
            // it automatically gets crimeIncidents and hazardMatrix!
            institutional: mergedInstitutional 
        });
    } catch (err) {
        console.error("FETCH ERROR:", err);
        res.status(500).json({ error: "FETCH FAILED", details: err.message });
    }
});

app.post('/api/save-basic-info', async (req, res) => {
    const { user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities } = req.body;
    try {
        await pool.query(`
            INSERT INTO lgu_basic_info (user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (user_id) DO UPDATE SET 
            name=$2, province=$3, region=$4, land_area=$5, barangays=$6, population=$7, languages=$8, religion=$9, economic_activities=$10`,
            [user_id, name, province, region, land_area, barangays, population, languages, religion, economic_activities]
        );
        res.json({ message: "Basic Info saved!" });
    } catch (err) {
        console.error("DB ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/save-officials', async (req, res) => {
    const { user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, council } = req.body;
    try {
        await pool.query(`
            INSERT INTO lgu_officials (user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, council)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (user_id) DO UPDATE SET 
            mayor=$2, vice_mayor=$3, tourism_officer=$4, planning_coordinator=$5, council=$6`,
            [user_id, mayor, vice_mayor, tourism_officer, planning_coordinator, JSON.stringify(council)]
        );
        res.json({ message: "Officials saved!" });
    } catch (err) {
        console.error("DB ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/save-tourism-assets', async (req, res) => {
    const { user_id, attractions, tourismMap } = req.body;
    try {
        await pool.query(`
            INSERT INTO lgu_tourism_assets (user_id, attractions, tourism_map)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id) DO UPDATE SET 
            attractions = EXCLUDED.attractions,
            tourism_map = EXCLUDED.tourism_map,
            updated_at = CURRENT_TIMESTAMP`,
            [user_id, JSON.stringify(attractions || []), tourismMap]
        );
        res.json({ message: "Attractions and Map saved!" });
    } catch (err) {
        console.error("DB SAVE ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/save-accommodations', async (req, res) => {
    const { user_id, accommodations, accommodation_profile } = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO lgu_tourism_assets (user_id, accommodations, facilities)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id) DO UPDATE SET 
            accommodations = EXCLUDED.accommodations,
            facilities = EXCLUDED.facilities,
            updated_at = CURRENT_TIMESTAMP
            RETURNING *`,
            [
                user_id, 
                JSON.stringify(accommodations || []), 
                JSON.stringify(accommodation_profile || [])
            ]
        );
        res.json({ message: "Accommodations saved!", data: result.rows[0] });
    } catch (err) {
        console.error("DATABASE ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/save-transport', async (req, res) => {
    const { user_id, list } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const query = `
            INSERT INTO transportation (user_id, list, updated_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (user_id) 
            DO UPDATE SET 
                list = EXCLUDED.list, 
                updated_at = NOW()
            RETURNING *;
        `;

        const values = [user_id, JSON.stringify(list || [])];
        const result = await pool.query(query, values);

        res.status(200).json({ 
            message: "TRANSPORTATION SAVED SUCCESSFULLY", 
            data: result.rows[0] 
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "FAILED TO SAVE TRANSPORT DATA" });
    }
});

// --- UPDATED INSTITUTIONAL ROUTE (SYNCHRONIZED WITH FRONTEND) ---
app.post('/api/save-institutional', async (req, res) => {
  const { user_id, data } = req.body; // Changed from userId to user_id to match AdminPanel payload

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const query = `
      INSERT INTO institutional_data (user_id, data, updated_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        data = EXCLUDED.data,
        updated_at = CURRENT_TIMESTAMP;
    `;
    
    // Changed 'db.query' to 'pool.query' to match your setup
    await pool.query(query, [user_id, JSON.stringify(data)]);
    res.status(200).json({ message: "Institutional data saved successfully" });
  } catch (err) {
    console.error("INSTITUTIONAL SAVE ERROR:", err.message);
    res.status(500).json({ error: "Database Error", details: err.message });
  }
});

app.post('/api/save-safety', async (req, res) => {
    const { user_id, crimeIncidents, hazardMatrix } = req.body;
    try {
        await pool.query(`
            INSERT INTO lgu_safety (user_id, crime_incidents, hazard_matrix, updated_at)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id) DO UPDATE SET 
            crime_incidents = EXCLUDED.crime_incidents,
            hazard_matrix = EXCLUDED.hazard_matrix,
            updated_at = CURRENT_TIMESTAMP`,
            [user_id, JSON.stringify(crimeIncidents || {}), JSON.stringify(hazardMatrix || {})]
        );
        res.json({ message: "Safety data saved!" });
    } catch (err) {
        console.error("SAFETY SAVE ERROR:", err.message);
        res.status(500).json({ error: "Database Error" });
    }
});
// --- 5. SERVER START ---
app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log(`Server running on http://localhost:3000`);
    console.log("JSON Limit: 50MB (Map Support Enabled)");
    console.log("-----------------------------------------");
});