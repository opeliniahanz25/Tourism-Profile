import pg from 'pg';
const { Pool } = pg;

// Connection string from Render environment variable or local database
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: connectionString && !connectionString.includes('localhost') 
    ? { rejectUnauthorized: false } 
    : false
});

// Automatically create database tables when the server boots
const initDb = async () => {
  if (!connectionString) {
    console.log("⚠️ DATABASE_URL not detected. Waiting for connection string...");
    return;
  }
  
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lgu_basic_info (
        user_id INT PRIMARY KEY,
        name VARCHAR(255),
        province VARCHAR(255),
        region VARCHAR(255),
        land_area VARCHAR(255),
        barangays VARCHAR(255),
        population VARCHAR(255),
        languages VARCHAR(255),
        religion VARCHAR(255),
        economic_activities TEXT
    );

    CREATE TABLE IF NOT EXISTS lgu_officials (
        user_id INT PRIMARY KEY,
        mayor VARCHAR(255),
        vice_mayor VARCHAR(255),
        tourism_officer VARCHAR(255),
        planning_coordinator VARCHAR(255),
        sk_federation_president VARCHAR(255),
        council JSONB,
        sk_members JSONB
    );

    CREATE TABLE IF NOT EXISTS lgu_tourism_assets (
        user_id INT PRIMARY KEY,
        attractions JSONB,
        accommodations JSONB,
        facilities JSONB,
        tourism_map TEXT
    );

    CREATE TABLE IF NOT EXISTS transportation (
        user_id INT PRIMARY KEY,
        list JSONB
    );

    CREATE TABLE IF NOT EXISTS institutional_data (
        user_id INT PRIMARY KEY,
        data JSONB
    );

    CREATE TABLE IF NOT EXISTS lgu_safety (
        user_id INT PRIMARY KEY,
        crime_incidents JSONB,
        hazard_matrix JSONB
    );
  `;

  try {
    await pool.query(createTablesQuery);
    console.log("-----------------------------------------");
    console.log("✅ ALL POSTGRESQL TABLES INITIALIZED SUCCESSFULLY!");
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("❌ ERROR INITIALIZING TABLES:", err.message);
  }
};

// Run table creation script on startup
initDb();

const db = {
  query: (text, params) => pool.query(text, params),
  connect: (callback) => pool.connect(callback)
};

export default db;