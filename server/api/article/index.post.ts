import { postArticleService } from "~/server/core/service/article";
import { insertArticleData } from "~/server/core/data/article";
import { getMissingFields } from "~/utils";
import jwt from 'jsonwebtoken'

export abstract class ArticlePayload {
    authorId: number
    text: string
    title: string
    cover: File | undefined

    constructor(article: ArticlePayload) {
        this.authorId = article.authorId
        this.text = article.text
        this.title = article.title
        this.cover = article.cover
    }
}
export default defineEventHandler({
    onRequest: (event) => {
        const authHeader = getRequestHeader(event, 'Authorization');
        if (!authHeader) {
            throw createError({
                statusCode: 401
            })
        }
        try {
            const { jwtSecret } = useRuntimeConfig()
            const decoded = jwt.verify(authHeader, jwtSecret)
        } catch (e) {
            throw createError({
                statusCode: 403,
                message: e as string
            })
        }
    },
    handler: async (event) => {
        const body = await readFormData(event);
        if (!body) {
            throw createError({
                statusCode: 400,
                message: "Nenhum campo identificado"
            })
        }

        const missingFields = getMissingFields({ authorId: 0, text: '', title: '', cover: '' }, body);

        if (missingFields.length > 0) {
            throw createError({
                statusCode: 400,
                message: `Campos obrigatórios faltando: ${missingFields.toString()}`
            })
        }

        const newArticle = {
            authorId: Number(body.get('authorId')!),
            text: body.get('text')! as string,
            title: body.get('title')! as string,
            cover: body.get('cover')! as File
        };
        return await postArticleService(
            newArticle,
            insertArticleData
        )
    }
})
