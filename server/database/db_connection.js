require("dotenv").config();

const { Pool } = require("pg");

const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // ssl: true // This is for future render.com requirements
});

dbPool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Postgresql running on port " + process.env.DB_PORT);
  }
});

module.exports = dbPool;
