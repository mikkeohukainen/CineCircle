const { dbPool } = require("../database/db_connection");

const groupMembers = {
  add: async (groupMember) => {
    const result = await dbPool.query(
      "INSERT INTO group_members (user_id, group_id, accepted) VALUES ($1, $2, $3) RETURNING *",
      [groupMember.userId, groupMember.groupId, groupMember.accepted || false],
    );
    return result.rows;
  },

  getAllByGroupId: async (groupId) => {
    const result = await dbPool.query(
      `
    SELECT
      gm.*,
      u.username
    FROM
      group_members AS gm
    JOIN
      users AS u ON gm.user_id = u.user_id
    WHERE
      gm.group_id = $1
  `,
      [groupId],
    );
    return result.rows;
  },

  getGroupsByUserId: async (userId) => {
    const result = await dbPool.query(
      "SELECT group_id, accepted FROM group_members WHERE user_id = $1",
      [userId],
    );
    return result.rows;
  },

  deleteGroupMember: async (groupId, userId) => {
    const result = await dbPool.query(
      "DELETE FROM group_members WHERE group_id = $1 AND user_id = $2 RETURNING *",
      [groupId, userId],
    );
    return result.rows;
  },

  deleteAllGroupMembers: async (groupId) => {
    await dbPool.query("DELETE FROM group_members WHERE group_id = $1", [groupId]);
  },

  acceptGroupMember: async (groupId, userId) => {
    const result = await dbPool.query(
      "UPDATE group_members SET accepted = TRUE WHERE group_id = $1 AND user_id = $2 RETURNING *",
      [groupId, userId],
    );
    return result.rows;
  },
};

module.exports = groupMembers;
