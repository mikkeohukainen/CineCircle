const db = require("../database/db_connection");

const media = {
  add: async (media) => {
    await db.query(
      "INSERT INTO media (title, type, description, tmdb_id, poster_url) VALUES ($1, $2, $3, $4, $5)",
      [media.title, media.type, media.description, media.tmdbId, media.posterUrl],
    );
  },
  getById: async (id) => {
    return db.query("SELECT * FROM media WHERE id = $1", [id]);
  },
  getByTmdbId: async (tmdbId) => {
    return db.query("SELECT * FROM media WHERE tmdb_id = $1", [tmdbId]);
  },
  getAll: async () => {
    return db.query("SELECT * FROM media");
  },
  update: async (media) => {
    db.query(
      "UPDATE media SET title = $2, type = $3, description = $4, tmdb_id = $5, poster_url = $6, released = $7 WHERE id = $1 RETURNING *",
      [
        media.id,
        media.title,
        media.type,
        media.description,
        media.tmdbId,
        media.posterUrl,
        media.released,
      ],
    );
  },
  delete: (id) => {
    db.query("DELETE FROM media WHERE id = $1", [id]);
  },
};

module.exports = media;
