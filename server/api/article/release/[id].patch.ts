import { releaseArticle } from "~/server/core/data/article"

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

        return releaseArticle(Number(articleId), queryParams.release === 'true' ? true : false)
    }
})
