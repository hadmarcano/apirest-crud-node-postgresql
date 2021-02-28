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

    const Users = `CREATE TABLE IF NOT EXISTS users(
      uid UUID PRIMARY KEY,
      name VARCHAR(40) NOT NULL,
      email TEXT NOT NULL,
      passwordHash VARCHAR(100) NOT NULL,
      UNIQUE(email)
      )`;

    const UUID = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    await client.query(Users, []);
    await client.query(UUID, []);

    await client.query("COMMIT");
  } catch (error) {
    await client("ROLLBACK");
    throw error;
  }
})();

module.exports = pool;
