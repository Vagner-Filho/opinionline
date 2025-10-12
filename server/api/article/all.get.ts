import { getAllArticles } from "~~/server/core/data/article";
import { checkToken } from "#imports";

export default defineEventHandler({
    onRequest: checkToken,
    handler: async () => {
        return getAllArticles()
    }
})
