import { updateArticleData } from "~/server/core/data/article"
import { getMissingFields } from "~/utils";

export default defineEventHandler({
    onRequest: checkToken,
    handler: async (event) => {
        const origin = getRequestURL(event).origin
        const body = await readFormData(event);
        if (!body) {
            throw createError({
                statusCode: 400,
                message: "Nenhum campo identificado"
            })
        }
        const missingFields = getMissingFields({ title: '', text: '', authorId: '', releaseDate: '', id: '' }, body);

        if (missingFields.length > 0) {
            throw createError({
                statusCode: 400,
                message: `Campos obrigatórios faltando: ${missingFields.toString()}`
            })
        }

        const article = {
            authorId: Number(body.get('authorId')!),
            text: body.get('text')! as string,
            title: body.get('title')! as string,
            cover: body.get('cover')! as File,
            releaseDate: Number(body.get('releaseDate')) || null,
            id: Number(body.get('id')!),
        }

        const release = body.get('release') === 'true' ? true : false
        return updateArticleData(article, origin, release)
    }
})
