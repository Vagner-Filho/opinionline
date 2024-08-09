import { pbkdf2Sync } from 'crypto'
import jwt from 'jsonwebtoken'
import { getUser } from '../data/user'

export async function login(params: { email: string, psswd: string }) {
    const user = await getUser(params.email)
    if (!user) {
        return undefined
    }
    const { psswdSecret } = useRuntimeConfig()
    const providedPsswd = pbkdf2Sync(params.psswd, psswdSecret, 1000, 64, 'sha512').toString('hex')
    if (providedPsswd !== user.psswd) {
        return undefined
    }
    const { jwtSecret } = useRuntimeConfig()
    const token = jwt.sign({ email: user.email, authorId: user.authorId }, jwtSecret, {
        expiresIn: '48h'
    })
    return token
}
