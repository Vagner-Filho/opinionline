export default [
    `CREATE TABLE IF NOT EXISTS author(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    picture TEXT NOT NULL,
    bio TEXT NOT NULL,
    contact TEXT NOT NULL
);`,

    `CREATE TABLE IF NOT EXISTS article(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    authorId INTEGER REFERENCES author(id),
    releaseDate DATETIME,
    cover TEXT NOT NULL
);`,

    `CREATE TABLE IF NOT EXISTS about(
    opinionline TEXT NOT NULL DEFAULT "Onde escrevo e publico meus textos!"
);`,

    `CREATE TABLE IF NOT EXISTS user(
    email TEXT PRIMARY KEY,
    psswd TEXT NOT NULL,
    authorId INTEGER UNIQUE REFERENCES author(id)
);`
]
