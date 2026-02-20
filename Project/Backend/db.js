import pg from 'pg';
const { Pool } = pg;

const isProduction = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : null,
  ...(isProduction ? {} : {
    user: 'postgres',
    host: 'localhost',
    database: 'website_db',
    password: 'HANSOPELINIA',
    port: 20323,
  }),
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

export default pool;