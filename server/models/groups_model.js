const db = require("../database/db_connection");

const groups = {
  getAll: async () => {
    try {
      const result = await db.query('SELECT * FROM groups');
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // getByGroupId: async (id) => {
  //   try {
  //     const result = await db.query('SELECT * FROM groups WHERE group_id = $1', [id]);
  //     return result.rows;
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // },

  add: async (group) => {
    try {
      const result = await db.query(
        'INSERT INTO groups (owner_id, group_name, description) VALUES ($1, $2, $3) RETURNING *',
        [group.ownerId, group.groupName, group.description],
      );
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // update: async (group) => {
  //   try {
  //     const result = await db.query(
  //       'UPDATE groups SET group_name = $1, description = $2 WHERE group_id = $3 RETURNING *',
  //       [group.groupName, group.description, group.groupId],
  //     );
  //     return result.rows;
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // },
  deleteGroup: async (groupId) => {
    try {
      const result = await db.query('DELETE FROM groups WHERE group_id = $1 RETURNING *', [groupId,]);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = groups;
