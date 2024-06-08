import { Article, ArticlePayload, type ReleasedArticle } from "../../entities";
import { db } from "../db";
import { writeFile } from "node:fs/promises";

export async function getReleasedArticlesData(): Promise<Array<ReleasedArticle> | Error> {
    try {
        const stmt = db.prepare('SELECT * FROM article WHERE releaseDate IS NOT NULL');
        return stmt.all() as Array<ReleasedArticle>;
    } catch (error) {
        return new Error('db failed to execute articles statement');
    }
}

export async function insertArticleData(article: ArticlePayload) {
    const releaseDate = new Date().getTime();
    const DEFAULT_COVER = '/article/default_cover.png';
    let coverPath: string;

    if (!article.cover) {
        coverPath = DEFAULT_COVER;
    } else {
        const newCoverPath = `/${article.cover.name}`;
        const data = await article.cover.arrayBuffer();
        try {
            await writeFile(newCoverPath, new Uint8Array(data), { flag: 'w+' });
            coverPath = newCoverPath;
            console.log('successfully wrote file to /public')
        } catch (e) {
            console.log('failed to write file')
            console.log(e)
            coverPath = DEFAULT_COVER;
        }
    }

    const stmt = db.prepare<Article>(`INSERT INTO article (title, text, authorId, releaseDate, cover) VALUES (@title, @text, @authorId, @releaseDate, @cover)`)
    try {
        const info = stmt.run({
            title: article.title,
            text: article.text,
            authorId: article.authorId,
            cover: coverPath,
            releaseDate: releaseDate
        });
        return { articleId: Number(info.lastInsertRowid), error: null }
    } catch (e) {
        return { articleId: null, error: new Error() }
    }
}

export async function getReleasedArticleByIdData(articleId: number) {
    const stmt = db.prepare<{ articleId: number }, ReleasedArticle>('SELECT * FROM article WHERE id = @articleId');
    try {
        const info = stmt.get({
            articleId
        })
        return info
    } catch (e) {
        return new Error()
    }
}
