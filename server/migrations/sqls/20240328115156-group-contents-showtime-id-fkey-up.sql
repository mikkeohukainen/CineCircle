ALTER TABLE group_contents ALTER COLUMN media_id DROP NOT NULL;
ALTER TABLE group_contents ADD COLUMN showtime_id INT;
ALTER TABLE group_contents
    ADD FOREIGN KEY (showtime_id)
    REFERENCES showtimes (showtime_id)
    ON UPDATE CASCADE ON DELETE CASCADE;
