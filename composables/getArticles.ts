import type { User } from "firebase/auth";
import { ref as fbRef, get, query, equalTo, orderByChild } from "firebase/database";

export default async function getArticles() {
  const db = getDb()
  const dbRef = fbRef(db, 'articles')

  const authorId = useState<User>('author').value.uid
  const q = query(dbRef, orderByChild('authorId'), equalTo(authorId));

  const rawResult = await get(q)
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return Error('Failed to fetch articles')
    }
  }).catch((error) => {
    console.error(error);
  })

  return transformRawArticle(rawResult)
}
