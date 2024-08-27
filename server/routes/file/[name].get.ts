import { join } from "node:path"
import { createReadStream } from "node:fs"

export default defineEventHandler(async (event) => {
    const base = '/server/file/article'
    if (!event.context.params) {
        throw createError({
            status: 400
        })
    }
    const filePath = join(process.cwd(), base, event.context.params.name)

    return sendStream(event, createReadStream(filePath))
})
