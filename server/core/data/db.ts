import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import path from 'path';

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

export { db };
