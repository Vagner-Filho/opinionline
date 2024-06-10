import { patchAboutData } from "~/server/core/data/about";
import { AboutSys } from "~/server/core/entities";
import { patchAboutService } from "~/server/core/service/about";

export default defineEventHandler(async (event) => {
    const body = await readBody<Partial<AboutSys>>(event);

    return await patchAboutService(patchAboutData, body)
})
