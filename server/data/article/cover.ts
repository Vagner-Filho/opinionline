import { getStorage, uploadBytes, ref as fbStorageRef } from "firebase/storage";

async function saveCover(cover: File, articleId: string) {
    const storage = getStorage();
    const storageRef = fbStorageRef(storage, `article/${articleId}`);
    uploadBytes(storageRef, cover)
    .then((snapshot) => {
        console.log('uploaded', snapshot)
    })
    .catch((err) => {
        console.warn('error', err)
    })
}

export { saveCover }
