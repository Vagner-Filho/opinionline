import { AboutSys } from "../../entities";

export async function getAboutService(getAboutData: () => Promise<AboutSys | undefined | Error>) {
    return await getAboutData();
}
