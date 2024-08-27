import { postArticleService } from "~/server/core/service/article";
import { insertArticleData } from "~/server/core/data/article";
import { getMissingFields } from "~/utils";
import { checkToken } from "~/server/utils";

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
    onRequest: checkToken,
    handler: async (event) => {
        const body = await readFormData(event);
        if (!body) {
            throw createError({
                statusCode: 400,
                message: "Nenhum campo identificado"
            })
        }

        const missingFields = getMissingFields({ authorId: 0, text: '', title: '', release: true }, body);

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

        const release = body.get('release')

        return await postArticleService(
            newArticle,
            getRequestURL(event).origin,
            release === null || release === 'false' ? false : true,
            insertArticleData
        )
    }
})
