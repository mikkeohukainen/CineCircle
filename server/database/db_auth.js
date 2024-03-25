const dbPool = require("./db_connection");

const dbAuth = {
  register: async function (username, hashedPw) {
    await dbPool.query(
      "INSERT INTO users (username, password_hash, created_at) VALUES ($1,$2, CURRENT_TIMESTAMP)",
      [username, hashedPw],
    );
  },
};

module.exports = dbAuth;
