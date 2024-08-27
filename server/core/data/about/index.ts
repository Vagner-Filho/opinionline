import { AboutSys } from "../../entities";
import { db } from "../db";
import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

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
        try {
            const stmt = db.prepare(`UPDATE about SET opinionline = '${about.opinionline}'`)
            stmt.run()
        } catch (e) {
            console.log('failed to update about:')
            console.log(e)
        }
    }

    let coverName = '';
    if (about.picture) {
        const newCoverPath = join(process.cwd(), '/public/author/', about.picture.name);
        const data = await about.picture.arrayBuffer();
        try {
            writeFileSync(newCoverPath, new Uint8Array(data))
            coverName = about.picture.name;
        } catch (e) {
            console.log('failed to write author picture')
            console.log(e)
        }
    }

    const authorColumns = Reflect.ownKeys(about).filter(column => typeof column === 'string' && column !== 'opinionline' && column !== 'id') as Array<string>;
    if (authorColumns.length === 0) {
        return about;
    }

    const authorValues = authorColumns.reduce((prev, curr) => {
        return prev.concat(prev.length === 0 ? `@${curr}` : `, @${curr}`)
    }, "");

    const query = `UPDATE author SET(${authorColumns.join(', ')}) =(${authorValues}) WHERE id = ${about.id}`

    try {
        const stmt = db.prepare(query);
        const aboutWithPictureName = { ...about, picture: coverName }
        stmt.run(aboutWithPictureName);
        return aboutWithPictureName;
    } catch (e) {
        return new Error(String(e));
    }
}
