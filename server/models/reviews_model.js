const { dbPool } = require("../database/db_connection");

const reviews = {
  getAll: async () => {
    try {
      const result = await dbPool.query("SELECT * FROM reviews");
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getByUsername: async (username) => {
    try {
      const result = await dbPool.query(
        "SELECT * FROM reviews WHERE user_id = (SELECT user_id FROM users WHERE username = $1)",
        [username],
      );
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getByMediaId: async (id) => {
    try {
      const result = await dbPool.query("SELECT * FROM reviews WHERE media_id = $1", [id]);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  add: async (body) => {
    try {
      const result = await dbPool.query(
        "INSERT INTO reviews (user_id, media_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
        [body.userId, body.mediaId, body.rating, body.reviewText],
      );
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  update: async (body) => {
    try {
      const result = await dbPool.query(
        "UPDATE reviews SET rating = $1, review_text = $2 WHERE review_id = $3 RETURNING *",
        [body.rating, body.reviewText, body.reviewId],
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
      const result = await dbPool.query("DELETE FROM reviews WHERE review_id = $1 RETURNING *", [
        id,
      ]);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = reviews;
