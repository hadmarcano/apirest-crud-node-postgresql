require("dotenv").config();

// let PGDB;
// let SECRET;
// if (process.env.NODE_ENV == "test") {
//   PGDB = process.env.PGDB_TEST;
//   SECRET = process.env.SECRET_TEST;
// } else {
//   PGDB = process.env.PGDB;
//   SECRET = process.env.SECRET;
// }

const { PGHOST, PGUSER, PGPASS, PGDB, PGPORT } = process.env;

module.exports = { PGHOST, PGUSER, PGPASS, PGDB, PGPORT };
