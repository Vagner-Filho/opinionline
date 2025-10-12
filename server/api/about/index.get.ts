import { getAboutData } from "~~/server/core/data/about"
import { getAboutService } from "~~/server/core/service/about"

export default defineEventHandler(async (event) => {
    return getAboutService(getAboutData)
        .then((res) => {
            if (!(res instanceof Error)) {
                return !!res
                    ? res
                    : sendNoContent(event)
            }
            throw createError({ status: 500, message: "Houve uma falha ao recuperar os dados :(" })
        })
})
