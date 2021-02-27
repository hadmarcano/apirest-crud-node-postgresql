const { Pool } = require("pg");

const { PGHOST, PGUSER, PGPASS, PGDB, PGPORT } = require("../utils/config");

const pool = new Pool({
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  host: PGHOST,
  password: PGPASS,
  port: PGPORT,
  database: PGDB,
  user: PGUSER,
});

(async function () {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const Users = `CREATE TABLE IF NOT EXIST users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(40),
        email TEXT
        )`;

    await client.query(Users, []);

    await client.query("COMMIT");
  } catch (error) {
    await client("ROLLBACK");
    throw error;
  }
});

module.exports = pool;
