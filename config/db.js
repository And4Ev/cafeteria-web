const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cafeteria",
  password: "m31de",
  port: 5432
});

module.exports = pool;