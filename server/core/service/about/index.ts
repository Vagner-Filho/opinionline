import { AboutSys } from "../../entities";

export async function getAboutService(getAboutData: () => Promise<AboutSys | undefined | Error>) {
    return await getAboutData();
}

export async function patchAboutService(patchAboutData: (about: Partial<AboutSys>) => Promise<Partial<AboutSys | Error>>, aboutPayload: Partial<AboutSys>) {
    return await patchAboutData(aboutPayload);
}
