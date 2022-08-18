import { getDatabase } from "firebase/database";

export default function getDb() {
  const { $firebaseApp } = useNuxtApp()

  return getDatabase($firebaseApp())
}