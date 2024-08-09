import { db } from './db'

interface User {
    email: string
    psswd: string
    authorId: number
}

export async function getUser(email: string) {
    const stmt = db.prepare<{ email: string }, User>('SELECT * FROM user WHERE email = @email')
    const res = stmt.get({
        email
    })
    return res
}
