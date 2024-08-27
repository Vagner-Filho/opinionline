import { patchAboutData } from "~/server/core/data/about";
import { AboutSys } from "~/server/core/entities";
import { patchAboutService } from "~/server/core/service/about";
import jwt from "jsonwebtoken"

export default defineEventHandler({
    handler: async (event) => {
        const authHeader = getRequestHeader(event, 'Authorization');
        if (!authHeader) {
            throw createError({
                statusCode: 401
            })
        }
        try {
            const { jwtSecret } = useRuntimeConfig()
            const decoded = jwt.verify(authHeader, jwtSecret)

            const body = await readFormData(event);
            let data = {} satisfies Partial<AboutSys>
            for (const [key, value] of body.entries()) {
                data[key] = value
            }
            return await patchAboutService(patchAboutData, { ...data, id: decoded.authorId })
        } catch (e) {
            throw createError({
                statusCode: 403,
                message: e as string
            })
        }
    }
})
