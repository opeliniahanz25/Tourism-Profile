import pg from 'pg';
const { Pool } = pg;

// This configuration checks if we are on Render (DATABASE_URL) 
// or on your local machine (using your manual settings).
const isProduction = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : null,
  // If not on Render, use your local settings
  ...(isProduction ? {} : {
    user: 'postgres',
    host: 'localhost',
    database: 'website_db',
    password: 'HANSOPELINIA',
    port: 20323,
  }),
  // SSL is required for Render's cloud database but usually not for localhost
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

export default pool;