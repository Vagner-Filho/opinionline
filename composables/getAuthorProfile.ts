
import { ref as fbRef, get, query } from "firebase/database";

export default async function getAuthorProfile() {
  const db = getDb()
  const dbRef = fbRef(db, 'about')

  const q = query(dbRef);

  const rawResult = await get(q)
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return Error('Failed to fetch author profile')
    }
  }).catch((error) => {
    console.error(error);
  })

  return rawResult;
}