import { ref as fbRef, set, update } from "firebase/database";

export enum ProfileInfoKey {
  author,
  contact,
  opinionline,
  name,
  email
}

export type ProfileInfo = {
  author: string
  contact: string
  opinionline: string
  name: string
  email: string
}

export default async function pushProfileInfo(profileInfo: ProfileInfo) {
  const db = getDb()
  set(fbRef(db, 'about/'), {
    author: profileInfo.author,
    name: profileInfo.name,
    contact: profileInfo.contact,
    email: profileInfo.email,
    opinionline: profileInfo.opinionline
  })
  .then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}