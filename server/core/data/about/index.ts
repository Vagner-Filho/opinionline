import { AboutSys } from "../../entities";
import { db } from "../db";

export async function getAboutData() {
    const stmt = db.prepare<[], AboutSys>("SELECT * FROM author JOIN about")
    try {
        const info = stmt.get();
        return info;
    } catch (e) {
        console.log(e)
        return new Error()
    }
}

export async function patchAboutData(about: Partial<AboutSys>) {
    if (!!about.opinionline) {
        const stmt = db.prepare()
    }

    const authorColumns = Reflect.ownKeys(about).filter(column => typeof column === 'string' && column !== 'opinionline') as Array<string>;
    if (authorColumns.length === 0) {
        return about;
    }

    const authorValues = authorColumns.reduce((prev, curr) => {
        return prev.concat(prev.length === 0 ? `@${curr}` : `, @${curr}`)
    }, "");

    const query = `UPDATE author SET(${authorColumns.join(', ')}) =(${authorValues}) WHERE id = ${about.id}`
    console.log(query)

    const stmt = db.prepare<Partial<AboutSys>, Partial<AboutSys>>(query);
    try {
        stmt.run(about);
        return about;
    } catch (e) {
        return new Error(String(e));
    }
}
