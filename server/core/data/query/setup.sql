CREATE TABLE IF NOT EXISTS author(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    picture TEXT NOT NULL,
    bio TEXT NOT NULL,
    contact TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS article(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    authorId INTEGER REFERENCES author(id),
    releaseDate DATETIME,
    cover TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS about(
    opinionline TEXT NOT NULL
);
