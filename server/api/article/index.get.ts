import { getReleasedArticlesService } from "~~/server/core/service/article"
import { getReleasedArticlesData } from "~~/server/core/data/article"

export default defineEventHandler(async (event) => {
    return getReleasedArticlesService(getReleasedArticlesData)
        .then((res) => {
            if (!(res instanceof Error)) {
                return res.length === 0
                    ? sendNoContent(event, 204)
                    : res
            }
            return res;
        })
})
