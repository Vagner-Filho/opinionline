import { deleteArticle } from "~/server/core/data/article";

export default defineEventHandler({
    onRequest: checkToken,
    handler: async (event) => {
        const articleId = getRouterParam(event, 'id');
        if (!articleId || isNaN(Number(articleId))) {
            throw createError({ status: 400 })
        }
        return await deleteArticle(Number(articleId))
    }
})
