const dbPool = require("../database/db_connection");

const userModel = {
  addNewUser: async function (username, hashedPw) {
    await dbPool.query(
      "INSERT INTO users (username, password_hash, created_at) VALUES ($1,$2, CURRENT_TIMESTAMP)",
      [username, hashedPw],
    );
  },

  // TODO: return id, reviews, favorites, groups
  getUser: async function (username) {
    const result = await dbPool.query(
      "select users.user_id, username, array_agg(distinct review_id) reviews_ids,array_agg(distinct favorite_id) favorite_ids,array_agg(distinct groups.group_id) group_ids from users left join reviews on users.user_id = reviews.user_id left join favorites on users.user_id = favorites.user_id left join group_members on users.user_id = group_members.user_id left join groups on group_members.group_id = groups.group_id where username = $1 group by users.user_id, groups.group_id;",
      [username],
    );

    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return null;
    }
  },

  deleteUser: async function (username) {
    await dbPool.query("DELETE FROM users WHERE username=$1", [username]);
  },

  getHashedPassword: async function (username) {
    const result = await dbPool.query(
      "SELECT user_id, password_hash FROM users WHERE username=$1",
      [username],
    );

    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  },

  addFavorites: async function (username, mediaId) {
    await dbPool.query(
      "INSERT INTO favorites (user_id,media_id) VALUES ((SELECT user_id FROM users WHERE username=$1),$2)",
      [username, mediaId],
    );
  },

  getFavorites: async function (username) {
    const result = await dbPool.query(
      //"SELECT * FROM media JOIN favorites ON favorites.media_id=media.media_id WHERE user_id=(SELECT user_id FROM users WHERE username=$1);",
      "SELECT media.tmdb_id, media.poster_url as poster_path FROM media JOIN favorites ON favorites.media_id=media.media_id WHERE user_id=(SELECT user_id FROM users WHERE username=$1);",
      [username],
    );

    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return null;
    }
  },

  getReviews: async function (username) {
    const result = await dbPool.query(
      "SELECT * FROM reviews WHERE user_id=(SELECT user_id FROM users WHERE username=$1)",
      [username],
    );
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return null;
    }
  },
};

module.exports = userModel;
