const { dbPool } = require("../database/db_connection");

const favorites = {
  getAll: async () => {
    try {
      const result = await dbPool.query("SELECT * FROM favorites");
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getByUsername: async (username) => {
    try {
      const result = await dbPool.query(
        "SELECT * FROM favorites WHERE user_id = (SELECT user_id FROM users WHERE username = $1)",
        [username],
      );
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  add: async (body) => {
    try {
      const result = await dbPool.query(
        "INSERT INTO favorites (user_id, media_id) VALUES ($1, $2) RETURNING *",
        [body.userId, body.mediaId],
      );
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  delete: async (id) => {
    try {
      const result = await dbPool.query(
        "DELETE FROM favorites WHERE favorite_id = $1 RETURNING *",
        [id],
      );
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = favorites;
