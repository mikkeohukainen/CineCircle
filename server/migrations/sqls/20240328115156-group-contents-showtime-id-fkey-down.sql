ALTER TABLE group_contents ALTER COLUMN media_id SET NOT NULL;
ALTER TABLE group_contents DROP CONSTRAINT group_contents_showtime_id_fkey;
ALTER TABLE group_contents DROP COLUMN showtime_id;
