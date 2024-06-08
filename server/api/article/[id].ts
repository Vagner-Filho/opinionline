import { getReleasedArticleByIdService } from "~/server/core/service/article"
import { getReleasedArticleByIdData } from "~/server/core/data/article"

export default defineEventHandler(async (event) => {
    const articleId = getRouterParam(event, 'id');
    if (!articleId || isNaN(Number(articleId))) {
        throw createError({
            statusCode: 400,
            message: "Dados necessários não encontrados"
        })
    }
    return getReleasedArticleByIdService(getReleasedArticleByIdData, Number(articleId))
        .then((res) => {
            if (!(res instanceof Error)) {
                return !res
                    ? sendNoContent(event, 204)
                    : res
            }
            setResponseStatus(event, 500, "Falha interna ao recuperar artigo")
            return res;
        })
})
