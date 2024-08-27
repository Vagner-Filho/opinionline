import Database from 'better-sqlite3';
import { pbkdf2Sync } from 'crypto'
import dbSetupCommands from '../data/query/setup'

const db = new Database(import.meta.dev ? 'opinionlinedev.db' : 'opinionline.db');

db.pragma('journal_mode = WAL');

const dbSetup = dbSetupCommands

for (const stmt of dbSetup) {
    const setupStmt = db.prepare(stmt);
    try {
        setupStmt.run();
    } catch (e) {
        console.log(`******* db stmt failed:\n stmt: ${stmt} \n error: ${e} \n ******`)
    }
}

const defaultEmail = import.meta.dev ? process.env.NUXT_EMAIL_DEV : process.env.NUXT_EMAIL as string
const defaultPsswd = import.meta.dev ? process.env.NUXT_PSSWD_DEV : process.env.NUXT_PSSWD as string
const { psswdSecret } = useRuntimeConfig()

if (!defaultPsswd || !defaultEmail || !psswdSecret) {
    throw Error("Required config missing")
}

const checkUserStmt = db.prepare('SELECT * FROM user')
const checkUserRes = checkUserStmt.get()
const psswd = pbkdf2Sync(defaultPsswd, psswdSecret, 1000, 64, 'sha512').toString('hex')

if (!checkUserRes) {
    const checkAuthorStmt = db.prepare('SELECT * FROM author')
    const checkAuthorRes = checkAuthorStmt.get()
    if (!checkAuthorRes) {
        try {
            const seedAuthorStmt = db.prepare(`INSERT INTO author (name, email, picture, bio, contact) VALUES ('author name', 'authoremail@email.com', '', 'bioo', 'contact info')`)
            seedAuthorStmt.run()

            const seedAbout = db.prepare('INSERT INTO about DEFAULT VALUES')
            seedAbout.run()
        } catch (e) {
            console.log('author seed error:')
            console.log(e)
        }
    }
    const seedUserStmt = db.prepare('INSERT INTO user VALUES (@email, @psswd, @authorId)')
    try {
        seedUserStmt.run({
            email: defaultEmail,
            psswd,
            authorId: 1
        })
    } catch (e) {
        console.log('user seed error:')
        console.log(e)
    }

} else {
    const updateUserStmt = db.prepare(`UPDATE user SET psswd = ?`)
    try {
        updateUserStmt.run(psswd)
    } catch (e) {
        console.log(e)
    }
}

export { db };
