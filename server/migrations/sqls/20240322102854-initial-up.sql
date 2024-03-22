CREATE TABLE users
(
    user_id uuid default uuid_generate_v4(),
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    PRIMARY KEY (user_id)
);

SELECT trigger_updated_at('users');

CREATE TYPE enum AS ENUM
    ('movie', 'series');

CREATE TABLE media
(
    media_id serial NOT NULL,
    title character varying(50) NOT NULL,
    type enum NOT NULL,
    description text,
    tmdb_id integer NOT NULL,
    poster_url character varying(255),
    released date,
    PRIMARY KEY (media_id)
);

CREATE TABLE reviews
(
    review_id serial,
    user_id uuid NOT NULL,
    media_id integer NOT NULL,
    rating integer NOT NULL,
    review_text text,
    created_at timestamp with time zone NOT NULL,
    PRIMARY KEY (review_id)
);

CREATE TABLE groups
(
    group_id serial,
    owner_id integer NOT NULL,
    group_name character varying(50) NOT NULL,
    description text,
    created_at timestamp with time zone NOT NULL,
    PRIMARY KEY (group_id)
);

CREATE TABLE group_members
(
    member_id serial,
    user_id uuid NOT NULL,
    group_id integer NOT NULL,
    accepted boolean,
    created_at timestamp with time zone,
    PRIMARY KEY (member_id)
);

CREATE TABLE group_contents
(
    content_id serial,
    group_id integer NOT NULL,
    media_id integer NOT NULL,
    added_by uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    PRIMARY KEY (content_id)
);

CREATE TABLE showtimes
(
    showtime_id serial,
    media_id integer NOT NULL,
    theater character varying(50) NOT NULL,
    showtime timestamp with time zone NOT NULL,
    PRIMARY KEY (showtime_id)
);

CREATE TABLE favorites
(
    favorite_id serial,
    user_id uuid NOT NULL,
    media_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    PRIMARY KEY (favorite_id)
);

ALTER TABLE reviews
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE reviews
    ADD FOREIGN KEY (media_id)
    REFERENCES media (media_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE group_members
    ADD FOREIGN KEY (group_id)
    REFERENCES groups (group_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE group_members
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE group_contents
    ADD FOREIGN KEY (group_id)
    REFERENCES groups (group_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE group_contents
    ADD FOREIGN KEY (media_id)
    REFERENCES media (media_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE group_contents
    ADD FOREIGN KEY (added_by)
    REFERENCES users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE showtimes
    ADD FOREIGN KEY (media_id)
    REFERENCES media (media_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE favorites
    ADD FOREIGN KEY (user_id)
    REFERENCES users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE favorites
    ADD FOREIGN KEY (media_id)
    REFERENCES media (media_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
