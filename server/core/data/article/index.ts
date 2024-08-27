import { Article, ArticlePayload, type ReleasedArticle } from "../../entities";
import { db } from "../db";
import { writeFileSync } from "node:fs";
import { join } from 'node:path'

export async function getReleasedArticlesData(): Promise<Array<ReleasedArticle> | Error> {
    try {
        const stmt = db.prepare('SELECT article.*, author.picture FROM article JOIN author ON article.authorId = author.id WHERE releaseDate IS NOT NULL ORDER BY releaseDate DESC');
        return stmt.all() as Array<ReleasedArticle>;
    } catch (error) {
        return new Error('db failed to execute articles statement');
    }
}

export async function getAllArticles(): Promise<Array<Required<Article>> | Error> {
    try {
        const stmt = db.prepare('SELECT * FROM article ORDER BY releaseDate DESC');
        return stmt.all() as Array<Required<Article>>;
    } catch (error) {
        return new Error('db failed to execute articles statement');
    }
}

export async function insertArticleData(article: ArticlePayload, origin: string, release: boolean = true) {
    const releaseDate = release ? new Date().getTime() : null;
    let coverPath: string = '';

    if (article.cover) {
        const coverName = article.cover.name.toLowerCase().replaceAll(' ', '-')
        const imgUrl = new URL(join(origin, '/file', coverName)).href
        const baseCoverPath = join(process.cwd(), '/server/file/article')
        const newCoverPath = join(baseCoverPath, coverName);
        const data = await article.cover.arrayBuffer();
        try {
            writeFileSync(newCoverPath, new Uint8Array(data))
            coverPath = imgUrl;
        } catch (e) {
            console.log('failed to write file')
            console.log(e)
            coverPath = '';
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

export async function updateArticleData(article: ArticlePayload & { id: number, releaseDate: number | null }, origin: string, release: boolean = true) {
    let coverPath: string = '';
    const releaseDate = !!release ? article.releaseDate ?? new Date().getTime() : null

    if (article.cover) {
        const coverName = article.cover.name.toLowerCase().replaceAll(' ', '-')
        const imgUrl = new URL(join(origin, '/file', coverName)).href
        const baseCoverPath = join(process.cwd(), '/server/file/article')
        const newCoverPath = join(baseCoverPath, coverName);
        const data = await article.cover.arrayBuffer();
        try {
            writeFileSync(newCoverPath, new Uint8Array(data), { flag: 'w+' })
            coverPath = imgUrl;
        } catch (e) {
            console.log('failed to write file during update operation')
            console.log(e)
            coverPath = '';
        }
    }

    try {
        const stmtText = !!article.cover
            ? `UPDATE article SET (title, text, authorId, releaseDate, cover) = (@title, @text, @authorId, @releaseDate, @cover) WHERE id = @id`
            : `UPDATE article SET (title, text, authorId, releaseDate) = (@title, @text, @authorId, @releaseDate) WHERE id = @id`

        const stmt = db.prepare<Article>(stmtText)

        const stmtParams = { ...article, cover: coverPath, releaseDate }
        if (!article.cover) {
            // @ts-ignore
            delete stmtParams.cover
        }
        stmt.run(stmtParams);
        return { articleId: Number(article.id), error: null }
    } catch (e) {
        return new Error(`${e}`)
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

export async function releaseArticle(id: number, release: boolean): Promise<null | number | Error> {
    const releaseDate = release ? new Date().getTime() : null

    try {
        const stmt = db.prepare<{ articleId: number, release: number | null }, number | null>('UPDATE article SET releaseDate = @release WHERE id = @articleId')
        stmt.run({
            articleId: id,
            release: releaseDate
        })
        return releaseDate
    } catch (e) {
        return new Error(`${e}`)
    }
}

export async function deleteArticle(id: number) {
    try {
        const stmt = db.prepare<number>('DELETE FROM article WHERE id = @id')
        stmt.run({ id })
        return true
    } catch (e) {
        console.log(e)
        return new Error(`${e}`)
    }
}
