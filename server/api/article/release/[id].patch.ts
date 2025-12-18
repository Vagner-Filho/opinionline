import { releaseArticle, getReleasedArticleByIdData } from "~~/server/core/data/article"
import { generateArticlePage } from "~~/server/core/service/page-generator";

export default defineEventHandler({
    onRequest: checkToken,
    handler: async (event) => {
        const queryParams = getQuery(event)
        const articleId = getRouterParam(event, 'id')
        if (!('release' in queryParams) || !articleId) {
            throw createError({
                status: 400
            })
        }

        const release = queryParams.release === 'true' ? true : false;

        if (release) {
            const article = await getReleasedArticleByIdData(Number(articleId));
            if (article instanceof Error) {
                throw article
            }
            await generateArticlePage(article);
        }

        return releaseArticle(Number(articleId), release)
    }
})
