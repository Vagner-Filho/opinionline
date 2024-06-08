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
