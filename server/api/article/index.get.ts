import { getReleasedArticlesService } from "~~/server/core/service/article"
import { getReleasedArticlesData } from "~~/server/core/data/article"

export default defineEventHandler(async () => {
    return getReleasedArticlesService(getReleasedArticlesData)
        .then((res) => res)
})
