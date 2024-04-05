const db = require("../database/db_connection");

const showtimes = {
  add: async (showtime) => {
    await db.query("INSERT INTO showtimes (media_id, theater, showtime) VALUES ($1, $2, $3)", [
      showtime.mediaId,
      showtime.theater,
      showtime.showtime,
    ]);
  },
  getAll: async () => {
    return db.query("SELECT * FROM showtimes");
  },
  getByMediaId: async (mediaId) => {
    return db.query("SELECT * FROM showtimes WHERE media_id = $1", [mediaId]);
  },
  delete: async (id) => {
    return db.query("DELETE FROM showtimes WHERE id = $1", [id]);
  },
};

module.exports = showtimes;
