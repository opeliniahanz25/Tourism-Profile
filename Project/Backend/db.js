import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'website_db',
  password: 'HANSOPELINIA',
  port: 20323,
});

export default pool; // Change module.exports to export default