import type { ArticlePayload, ReleasedArticle } from "../../entities";

export async function getReleasedArticlesService(articlesOrderedByReleaseDate: () => Promise<Array<ReleasedArticle> | Error>): Promise<Array<ReleasedArticle> | Error> {
    const data = await articlesOrderedByReleaseDate();
    if (data instanceof Error) {
        return Error("Desculpe, houve uma falha ao carregar os artigos")
    }
    return data;
}

export async function postArticleService(article: ArticlePayload, origin: string, release: boolean = true, insertToDb: (article: ArticlePayload, origin: string, release: boolean) => Promise<{ articleId: number | null, error: Error | null}>) {
    const { articleId, error } = await insertToDb(article, origin, release);
    if (!error && !!articleId) {
        return articleId;
    }
    return Error("Desculpe, houve uma falha ao cadastrar um novo artigo :(");
}

export async function getReleasedArticleByIdService(getById: (articleId: number) => Promise<ReleasedArticle | undefined | Error>, articleId: number) {
    return await getById(articleId);
}
