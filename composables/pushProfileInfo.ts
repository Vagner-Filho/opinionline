import { ref as fbRef, set, update } from "firebase/database";
import { ref as fbStorageRef, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";

export enum ProfileInfoKey {
  author,
  authorPic,
  contact,
  opinionline,
  name,
  email
}

export type ProfileInfo = {
  author: string
  authorPic: File
  contact: string
  opinionline: string
  name: string
  email: string
}

export default async function pushProfileInfo(profileInfo: ProfileInfo) {
  const db = getDb()
  const authorPic = profileInfo.authorPic ? profileInfo.authorPic.name.toLowerCase().trim() : false;
  set(fbRef(db, 'about/'), {
    author: profileInfo.author,
    authorPic: authorPic ?? undefined,
    name: profileInfo.name,
    contact: profileInfo.contact,
    email: profileInfo.email,
    opinionline: profileInfo.opinionline,
  })
  .then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })

  if (authorPic) {
    const storage = getStorage();
    const storageRef = fbStorageRef(storage, `author/picture/${authorPic}`);
    uploadBytes(storageRef, profileInfo.authorPic)
      .then((snapshot) => {
        console.log('uploaded author pic', snapshot)
      })
      .catch((err) => {
        console.warn('error in author pic', err)
      })
  }
}