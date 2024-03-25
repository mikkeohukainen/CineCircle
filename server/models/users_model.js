const dbPool = require("../database/db_connection");

// dummy function for testing - DELETE
async function getUserNames() {
  let tmpQuery = await dbPool.query("select username from users");
  return tmpQuery.rows;
}

module.exports = { getUserNames };
