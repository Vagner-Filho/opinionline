<template>
  <div class="max-w-4xl m-auto">
    <AuthorArticleForm
      v-if="!isLoadingData"
      :titlePlaceholder="'Título'"
      :isViewOnly="$route.query.isViewOnly === '1'"
      :coverPlaceholder="'Adicionar Capa'"
      :articleTextPlaceholder="'Texto'"
      :existing-article="existingArticle"
      @article="handleSubmit"
      @save="handleSave"
    />
    <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
  </div>
</template>

<script setup lang="ts">
import type { User } from "firebase/auth";
import { ref as fbRef, set, Database, push } from "firebase/database";
import { getStorage, uploadBytes, ref as fbStorageRef } from "firebase/storage";
import type { ArticleData } from "~/components/author/article/types";

  // definePageMeta({
  //   layout: 'author'
  // })
  
  function handleSubmit(articleData: ArticleData) {
    const db = getDb()
    const route = useRoute()
    if (route.query.isNew === '1') {
      createArticle(db, articleData)
    } else {
      updateArticle(db, articleData, route.query.articleId.toString())
    }
  }
  async function createArticle(db: Database, articleData: ArticleData) {
    const coverName = articleData.cover ? articleData.cover.name.toLowerCase().trim() : false;
    push(fbRef(db, 'articles/'), {
      authorPic: false,
      cover: coverName,
      preview: 'new inserted text',
      releaseDate: new Date().getTime(),
      text: articleData.text,
      title: articleData.title,
      authorId: useState<User>('author').value.uid
    }).then((onfulfilled) => {
      alert('Artigo criado com sucesso!')
    }).catch((error) => {
      console.error(error);
    })

    if (articleData.cover && coverName) {
      const storage = getStorage();
      const storageRef = fbStorageRef(storage, coverName);
      uploadBytes(storageRef, articleData.cover)
        .then((snapshot) => {
          console.log('uploaded', snapshot)
        })
        .catch((err) => {
          console.warn('error', err)
        })
    }
  }
  function updateArticle(db: Database, articleData, articleId: string) {
    set(fbRef(db, `articles/${articleId}`), {
      authorPic: false,
      cover: false,
      preview: 'edited text',
      releaseDate: new Date().toLocaleDateString('pt-br'),
      text: articleData.text,
      title: articleData.title,
      authorId: useState<User>('author').value.uid
    }).then((onfulfilled) => {
      alert('Artigo atualizado com sucesso!')
    }).catch((error) => {
      console.error(error);
    })
  }

  const isLoadingData = ref(false)
  const existingArticle = ref({})
  onMounted(async() => {
    const route = useRoute()
    if (route.query.isNew === '0' || route.query.isViewOnly === '1') {
      isLoadingData.value = true
      existingArticle.value = await getArticleFromId(route.query.articleId)
      isLoadingData.value = false
    }
  })

  const route = useRoute()
  watchEffect(() => {
    if (route.query.isNew === '1') {
      const defaultForm = {
        title: '',
        cover: false,
        text: ''
      }
      existingArticle.value = { ...defaultForm }
    }
  })

  function handleSave(articleData) {
    const iDBReq = window.indexedDB.open('opinionline');

    iDBReq.onerror = (e) => {
      console.warn(e);
    }

    iDBReq.onsuccess = (e) => {
      const db = iDBReq.result;
      const trans = db.transaction('articles', 'readwrite');

      trans.onerror = (e) => {
        console.warn(e);
      }

      const store = trans.objectStore('articles');
      const req = store.add({ ...articleData, authorId: useState<User>('author').value.uid });
      req.onsuccess = (e) => {
        console.log('article sucessfully saved!');
      }
    }

    iDBReq.onupgradeneeded = () => {
      const db = iDBReq.result;
      const store = db.createObjectStore('articles', { autoIncrement: true });
      store.add({ ...articleData, authorId: useState<User>('author').value.uid });
    }
  }
</script>