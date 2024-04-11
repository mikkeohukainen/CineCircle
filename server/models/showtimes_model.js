const db = require("../database/db_connection");

const showtimes = {
  add: async (showtime) => {
    await db.query("INSERT INTO showtimes (theater, showtime) VALUES ($1, $2)", [
      showtime.theater,
      showtime.showtime,
    ]);
  },
  getAll: async () => {
    return db.query("SELECT * FROM showtimes");
  },

  getByTheaterAndTimestap: async (theater, showtime) => {
    return db.query("SELECT * FROM showtimes WHERE theater = $1 AND showtime = $2", [
      theater,
      showtime,
    ]);
  },


  delete: async (id) => {
    return db.query("DELETE FROM showtimes WHERE id = $1", [id]);
  },
};

module.exports = showtimes;
