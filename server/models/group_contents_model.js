const { dbPool } = require("../database/db_connection");

const groupContents = {
  getGroupContents: async (groupId) => {
    const result = await dbPool.query(
      `SELECT group_contents.*, users.username, showtimes.showtime_id
      FROM group_contents
      INNER JOIN users ON group_contents.added_by = users.user_id
      INNER JOIN showtimes ON showtimes.showtime_id = group_contents.showtime_id
      WHERE group_contents.group_id = $1`,
      [groupId],
    );
    return result.rows;
  },

  addMediaToGroup: async (groupContent) => {
    const result = await dbPool.query(
      "INSERT INTO group_contents (group_id, media_id, added_by) VALUES ($1, (SELECT media_id FROM media WHERE tmdb_id=$2), $3) RETURNING *",
      [groupContent.groupId, groupContent.tmdbId, groupContent.addedBy],
    );
    return result.rows;
  },

  addShowtimeToGroup: async (groupContent) => {
    const result = await dbPool.query(
      "INSERT INTO group_contents (group_id, showtime_id, added_by) VALUES ($1, $2, $3) RETURNING *",
      [groupContent.groupId, groupContent.ID, groupContent.addedBy],
    );
    return result.rows;
  },

  deleteGroupContentById: async (contentId) => {
    const result = await dbPool.query(
      "DELETE FROM group_contents WHERE content_id = $1 RETURNING *",
      [contentId],
    );
    return result.rows;
  },

  deleteAllGroupContent: async (groupId) => {
    await dbPool.query("DELETE FROM group_contents WHERE group_id = $1", [groupId]);
  },
};

module.exports = groupContents;
