-- We try to ensure every table has `created_at` and `updated_at` columns (where applicable),
-- which can immensely help with debugging.
--
-- `created_at` is easy to set as we can just use `default now()` on the column.
--
-- `updated_at` is harder to set as we need to set it on every update of the row.
--              This can be done with a trigger, that runs a function that sets the `updated_at` column to `now()`.
--              We also need to create a trigger for every table, which can be done with a function that creates a trigger.
--
--              We can then call this function for every table as follows:
--              `select trigger_updated_at('my_table_name')`
--              after the `create table` statement.
CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trigger_updated_at(tablename regclass)
    RETURNS void
    AS $$
BEGIN
    EXECUTE format('CREATE TRIGGER set_updated_at
        BEFORE UPDATE
        ON %s
        FOR EACH ROW
        WHEN (OLD is distinct from NEW)
    EXECUTE FUNCTION set_updated_at();', tablename);
END;
$$
LANGUAGE plpgsql;
