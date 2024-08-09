import { login } from "../core/service/auth";

export default defineEventHandler(async (event) => {
    const body = await readFormData(event);
    const email = body.get('email') as string | null
    const psswd = body.get('psswd') as string | null
    if (!email || !psswd) {
        throw createError({
            statusCode: 400,
            message: "E-mail ou senha inválidos"
        })
    }

    const res = await login({ email, psswd })
    if (!res) {
        throw createError({
            statusCode: 400,
            message: "E-mail ou senha inválidos"
        })
    }
    return { token: res }
})
