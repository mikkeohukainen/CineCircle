const db = require("../database/db_connection");

const groups = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM groups");
    return result.rows;
  },

  add: async (group) => {
    const result = await db.query(
      "INSERT INTO groups (owner_id, group_name, description) VALUES ($1, $2, $3) RETURNING *",
      [group.ownerId, group.groupName, group.description],
    );
    return result.rows;
  },

  deleteGroup: async (groupId) => {
    const result = await db.query("DELETE FROM groups WHERE group_id = $1 RETURNING *", [groupId]);
    return result.rows;
  },
};

module.exports = groups;
