const db = require("../database/db_connection");

const groups = {
  getAll: async () => {
    const result = await db.query(`
    SELECT 
        groups.*, 
        users.username AS owner_username,
        COALESCE(gm.member_count, 0) AS member_count
      FROM 
        groups
      JOIN 
        users ON groups.owner_id = users.user_id
      LEFT JOIN 
        (SELECT group_id, COUNT(*) AS member_count FROM group_members WHERE accepted = true GROUP BY group_id) AS gm ON groups.group_id = gm.group_id
    `);
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
