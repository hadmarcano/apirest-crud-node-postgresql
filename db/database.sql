CREATE DATABASE firstapi;

CREATE TABLE users(
    uid UUID PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email TEXT NOT NULL,
    passwordHash VARCHAR(100) NOT NULL,
    UNIQUE(email)
);

INSERT INTO users (name, email) VALUES
    ('joe','joe@ibm.com'),
    ('ryan','ryan@faztweb.com');

-- Tipo de dato id serial

-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(40) NOT NULL,
--     email TEXT NOT NULL,
--     passwordHash VARCHAR(100) NOT NULL,
--     UNIQUE(email)
-- );