CREATE TYPE account_types AS ENUM ('group admin', 'individual lecturer');

/* account_management */
CREATE TABLE IF NOT EXISTS account_management (
    account_management_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    institution TEXT NOT NULL,
    department TEXT NOT NULL,
    account_type account_types,
    paid BOOLEAN DEFAULT FALSE NOT NULL,
    code TEXT
);
