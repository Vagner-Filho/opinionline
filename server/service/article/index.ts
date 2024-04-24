import { Article, type IArticle } from "~/server/entities";

export async function getArticlesService(articlesOrderedByPublishingDate: () => Promise<Array<IArticle> | Error>): Promise<Array<IArticle> | Error> {
  const data = await articlesOrderedByPublishingDate();
  if (data instanceof Error) {
    return Error("Desculpe, houve uma falha ao carregar os artigos")
  }
  return data;
}

export type INewArticle = Omit<Article, "id" | "publishingDate">
export async function registerArticle(params: { newArticle: INewArticle, postArticle: (article: Article) => Promise<boolean> }) {
  // const missingFields: Array<string> = [];
  // const requiredFields = Reflect.ownKeys(Article).filter((field) => typeof field === "string" && (field !== 'id' && field !== 'publishingDate'))
  // for (const articleField of Reflect.ownKeys(params.newArticle)) {
  //   if (!requiredFields.includes(articleField) && typeof articleField === "string") {
  //     missingFields.push(articleField)
  //   }
  // }

  // if (missingFields.length > 0) {
  //   // TODO: handle missing fields
  // }

  const missing = getMissingFields<"id" | "publishingDate">(Article, params.newArticle)

  const newArticle = {
    ...params.newArticle,
    id: "",
    publishingDate: new Date().getTime()
  } satisfies Article

  params.postArticle(newArticle)
}

function getMissingFields<ToOmit extends string>(requiredObj: Omit<object, ToOmit>, providedObj: object) {
  const requiredFields = Reflect.ownKeys(requiredObj);
  return Reflect.ownKeys(providedObj).reduce<Array<string>>((acc, field) => {
    if (!requiredFields.includes(field) && typeof field === "string") {
      acc.push(field)
      return acc;
    }
    return acc;
  }, [])
}
