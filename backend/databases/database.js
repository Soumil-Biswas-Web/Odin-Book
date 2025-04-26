import env from 'dotenv';

// Uncomment this to use local psql db
// import pkg from 'pg';
// const { Pool } = pkg;

// env.config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// async function getEntries() {
//   const result = await pool.query("SELECT * FROM main");
//   return result.rows;
// }

// export { getEntries, pool };

// Uncomment this to use Neon psql db
import { neon } from '@neondatabase/serverless';

env.config();

const sql = neon(process.env.DATABASE_URL);

const pool = {
  query: async (text, params) => {
    return {
      rows: await sql(text, params),
    };
  },
};

async function getEntries() {
  const result = await sql`SELECT * FROM main`;
  return result; // result is an array of rows
}

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

console.log(requestHandler);

export { getEntries, pool };