ALTER TABLE showtimes DROP COLUMN showtime, DROP COLUMN theater;

ALTER TABLE showtimes ADD showtime_obj JSON NOT NULL;
