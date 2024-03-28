const db = require('../database/db_connection');

const groupContents = {
    getGroupContents: async (groupId) => {
        try {
        const result = await db.query('SELECT * FROM group_contents WHERE group_id = $1', [groupId]);
        return result.rows;
        } catch (err) {
        console.error(err);
        throw err;
        }
    },
    
    addGroupContent: async (groupContent) => {
        try {
        const result = await db.query(
            'INSERT INTO group_contents (group_id, media_id, added_by) VALUES ($1, $2, $3) RETURNING *',
            [groupContent.groupId, groupContent.mediaId, groupContent.addedBy],
        );
        return result.rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    deleteGroupContent: async (groupContentId) => {
        try {
            const result = await db.query('DELETE FROM group_contents WHERE content_id = $1 RETURNING *', [groupContentId]);
            return result.rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};

    
module.exports = groupContents;