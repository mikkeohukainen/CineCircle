const { dbPool } = require("../database/db_connection");

const reviews = {
  getAll: async () => {
    const result = await dbPool.query(
      "SELECT reviews.*, users.username, media.* FROM reviews JOIN users USING (user_id) JOIN media USING (media_id)",
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
  getByTmdbId: async (tmdbId) => {
    const result = await dbPool.query(
      `SELECT users.username, reviews.*
      FROM reviews
      JOIN users USING (user_id)
      WHERE reviews.media_id = (SELECT media_id FROM media WHERE tmdb_id=$1 LIMIT 1)`,
      [tmdbId],
    );
    return result.rows;
  },
  add: async (body) => {
    const result = await dbPool.query(
      `INSERT INTO reviews (user_id, media_id, rating, review_text)
      VALUES ($1, (SELECT media_id FROM media where tmdb_id=$2 LIMIT 1), $3, $4) RETURNING *`,
      [body.userId, body.tmdbId, body.rating, body.reviewText],
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
