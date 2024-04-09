require("dotenv").config();

const { Pool } = require("pg");

const dbPool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  // ssl: true // This is for future render.com requirements
});

dbPool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Postgresql running on port " + process.env.POSTGRES_PORT);
  }
});

module.exports = dbPool;
