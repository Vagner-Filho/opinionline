import { ref as fbRef, get } from "firebase/database";

export default async function getArticleFromId(id: string | string[]) {
  const db = getDb()
  const dbRef = fbRef(db, `articles/${id}`)


  const rawResult = await get(dbRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return Error('Failed to fetch articles')
    }
  }).catch((error) => {
    console.error(error);
  })
  return rawResult
  // return transformRawArticle(rawResult)
}