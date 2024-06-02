import type { ArticlePayload, ReleasedArticle } from "../../entities";

export async function getReleasedArticlesService(articlesOrderedByReleaseDate: () => Promise<Array<ReleasedArticle> | Error>): Promise<Array<ReleasedArticle> | Error> {
    const data = await articlesOrderedByReleaseDate();
    if (data instanceof Error) {
        return Error("Desculpe, houve uma falha ao carregar os artigos")
    }
    return data;
}

export async function postArticleService(article: ArticlePayload, insertToDb: (article: ArticlePayload) => Promise<{ articleId: number | null, error: Error | null}>) {
    const { articleId, error } = await insertToDb(article);
    if (!error && !!articleId) {
        return articleId;
    }
    return Error("Desculpe, houve uma falha ao cadastrar um novo artigo :(");
}
