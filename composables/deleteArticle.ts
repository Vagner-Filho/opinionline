import { ref as fbRef, remove } from 'firebase/database'

export default async function deleteArticle(id: string) {
  const db = getDb();
  const dbRef = fbRef(db, `articles/${id}`);
  return await remove(dbRef)
} 