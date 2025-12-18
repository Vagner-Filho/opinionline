import { postArticleService } from "~~/server/core/service/article";
import { insertArticleData, getReleasedArticleByIdData } from "~~/server/core/data/article";
import { getMissingFields } from "~/utils";
import { checkToken } from "~~/server/utils";
import { generateArticlePage } from "~~/server/core/service/page-generator";

export abstract class ArticlePayload {
    authorId: number
    content: string
    title: string
    cover: File | undefined

    constructor(article: ArticlePayload) {
        this.authorId = article.authorId
        this.content = article.content
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

        const missingFields = getMissingFields({ authorId: 0, content: '', title: '', release: true }, body);

        if (missingFields.length > 0) {
            throw createError({
                statusCode: 400,
                message: `Campos obrigatórios faltando: ${missingFields.toString()}`
            })
        }

        const newArticle = {
            authorId: Number(body.get('authorId')!),
            content: body.get('content')! as string,
            title: body.get('title')! as string,
            cover: body.get('cover')! as File
        };

        const release = body.get('release')

        const articleId = await postArticleService(
            newArticle,
            getRequestURL(event).origin,
            release === null || release === 'false' ? false : true,
            insertArticleData
        )

        if (release && !(articleId instanceof Error)) {
            const article = await getReleasedArticleByIdData(articleId as number);
            if (article instanceof Error) {
                throw article
            }
            await generateArticlePage(article);
        }

        return articleId;
    }
})
