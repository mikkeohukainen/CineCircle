const dbPool = require("./db_connection");

const dbAuth = {
  register: async function (username, hashedPw) {
    await dbPool.query(
      "INSERT INTO users (username, password_hash, created_at) VALUES ($1,$2, CURRENT_TIMESTAMP)",
      [username, hashedPw],
    );
  },

  getHashedPassword: async function (username) {
    const result = await dbPool.query("SELECT password_hash FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rowCount > 0) {
      return result.rows[0].password_hash;
    } else {
      return null;
    }
  },
};

module.exports = dbAuth;
