import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import path from 'path';
import { pbkdf2Sync } from 'crypto'

const db = new Database(import.meta.dev ? 'opinionlinedev.db' : 'opinionline.db');

db.pragma('journal_mode = WAL');

const dbSetup = readFileSync(path.resolve('server/core/data/query/setup.sql'), 'utf8').toString().trim();

for (const stmt of dbSetup.split(';').filter(stmt => stmt.length > 0)) {
    const setupStmt = db.prepare(stmt + ';');
    try {
        setupStmt.run();
    } catch (e) {
        console.log(`******* db stmt failed:\n stmt: ${stmt} \n error: ${e} \n ******`)
    }
}

if (import.meta.dev) {
    const stmt = db.prepare('SELECT * FROM user')
    const res = stmt.get()
    const { psswdSecret } = useRuntimeConfig()
    const psswd = pbkdf2Sync('devpsswd', psswdSecret, 1000, 64, 'sha512').toString('hex')
    if (!res) {
        const seedUserStmt = db.prepare('INSERT INTO user VALUES (@email, @psswd, @authorId)')
        seedUserStmt.run({
            email: 'devuser@gmail.com',
            psswd,
            authorId: 1
        })
    } else {
        const updateUserStmt = db.prepare(`UPDATE user SET psswd = ?`)
        try {
            updateUserStmt.run(psswd)
        } catch (e) {
            console.log(e)
        }
    }
}

export { db };
