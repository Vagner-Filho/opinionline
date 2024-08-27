import { getAllArticles } from "~/server/core/data/article";
import { checkToken } from "~/server/utils";

export default defineEventHandler({
    onRequest: checkToken,
    handler: async () => {
        return getAllArticles()        
    }
})
