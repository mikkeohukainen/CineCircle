const { dbPool } = require("../database/db_connection");

const showtimes = {
  add: async (showtime) => {
    await dbPool.query("INSERT INTO showtimes (theater, showtime, event_id) VALUES ($1, $2, $3)", [
      showtime.theater,
      showtime.showtime,
      showtime.EventID,
    ]);
  },
  getAll: async () => {
    return dbPool.query("SELECT * FROM showtimes");
  },

  getByTheaterAndTimestap: async (theater, showtime) => {
    return dbPool.query("SELECT * FROM showtimes WHERE theater = $1 AND showtime = $2", [
      theater,
      showtime,
    ]);
  },

  delete: async (id) => {
    return dbPool.query("DELETE FROM showtimes WHERE id = $1", [id]);
  },
};

module.exports = showtimes;
