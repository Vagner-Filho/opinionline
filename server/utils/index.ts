import jwt from 'jsonwebtoken'

export async function checkToken(event: any) {
    const authHeader = getRequestHeader(event, 'Authorization');
    if (!authHeader) {
        throw createError({
            statusCode: 401
        })
    }
    try {
        const { jwtSecret } = useRuntimeConfig()
        jwt.verify(authHeader, jwtSecret)
    } catch (e) {
        throw createError({
            statusCode: 403,
            message: e as string
        })
    }
}
