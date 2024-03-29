const db = require("../database/db_connection");

const groupMembers = {
  add: async (groupMember) => {
    const result = await db.query(
      "INSERT INTO group_members (user_id, group_id, accepted) VALUES ($1, $2, $3) RETURNING *",
      [groupMember.userId, groupMember.groupId, groupMember.accepted || false],
    );
    return result.rows;
  },
  getAllByGroupId: async (groupId) => {
    const result = await db.query("SELECT * FROM group_members WHERE group_id = $1", [groupId]);
    return result.rows;
  },
  deleteGroupMember: async (groupId, userId) => {
    const result = await db.query(
      "DELETE FROM group_members WHERE group_id = $1 AND user_id = $2 RETURNING *",
      [groupId, userId],
    );
    return result.rows;
  },
  deleteAllGroupMembers: async (groupId) => {
    await db.query("DELETE FROM group_members WHERE group_id = $1", [groupId]);
  },
  acceptGroupMember: async (groupId, userId) => {
    const result = await db.query(
      "UPDATE group_members SET accepted = TRUE WHERE group_id = $1 AND user_id = $2 RETURNING *",
      [groupId, userId],
    );
    return result.rows;
  },
};

module.exports = groupMembers;
