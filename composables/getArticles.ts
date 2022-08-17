import { getDatabase, ref as fbRef, child, get } from "firebase/database";

export default async function getArticles() {
  const { $firebaseApp } = useNuxtApp()

  const db = getDatabase($firebaseApp())
  const dbRef = fbRef(db)
  const route = useRoute()
  get(child(dbRef,`articles/${route.params.id}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return Error('Failed to fetch articles')
    }
  }).catch((error) => {
    console.error(error);
  })
}