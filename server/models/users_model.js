const dbPool = require("../database/db_connection");

const userModel = {
  // dummy function for testing - DELETE
  getUserNames: async function () {
    let tmpQuery = await dbPool.query("select username from users");
    return tmpQuery.rows;
  },
};

module.exports = userModel;
