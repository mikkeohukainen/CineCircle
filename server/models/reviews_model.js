const { dbPool } = require("../database/db_connection");

const reviews = {
  getAll: async () => {
    const result = await dbPool.query(
      "SELECT reviews.*, users.username FROM reviews JOIN users USING (user_id)",
    );
    return result.rows;
  },
  getByUsername: async (username) => {
    const result = await dbPool.query(
      "SELECT * FROM reviews JOIN users USING (user_id) WHERE users.username = $1",
      [username],
    );
    return result.rows;
  },
  getByMediaId: async (id) => {
    const result = await dbPool.query("SELECT * FROM reviews WHERE media_id = $1", [id]);
    return result.rows;
  },
  add: async (body) => {
    const result = await dbPool.query(
      "INSERT INTO reviews (user_id, media_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
      [body.userId, body.mediaId, body.rating, body.reviewText],
    );
    return result.rows;
  },
  update: async (body) => {
    const result = await dbPool.query(
      "UPDATE reviews SET rating = $1, review_text = $2 WHERE review_id = $3 RETURNING *",
      [body.rating, body.reviewText, body.reviewId],
    );
    return result.rows;
  },
  delete: async (id) => {
    const result = await dbPool.query("DELETE FROM reviews WHERE review_id = $1 RETURNING *", [id]);
    return result.rows;
  },
};

module.exports = reviews;
