<template>
  <div class="max-w-4xl m-auto">
    <AuthorArticleForm
      v-if="!isLoadingData"
      :titlePlaceholder="'Título'"
      :isViewOnly="$route.query.isViewOnly === '1'"
      :coverPlaceholder="'Adicionar Capa'"
      :articleTextPlaceholder="'Texto'"
      :existing-article="existingArticle"
      :cover-url="coverUrl"
      @article="handleSubmit"
    />
    <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
  </div>
</template>

<script setup lang="ts">
import type { User } from "firebase/auth";
import { ref as fbRef, update, Database, push } from "firebase/database";
import { getStorage, uploadBytes, ref as fbStorageRef, getDownloadURL } from "firebase/storage";
import type { ArticleData } from "~/components/author/article/types";
import { Article } from "~/server/entities";

  // definePageMeta({
  //   layout: 'author'
  // })
  
  function handleSubmit(articleData: ArticleData) {
    const db = getDb()
    const route = useRoute()
    const articleId = route.query.articleId;
    console.log(articleId);
    if (!articleId) {
      createArticle(db, articleData)
    } else {
      updateArticle(db, articleData, articleId.toString())
    }
  }
  async function createArticle(db: Database, articleData: ArticleData) {
    push(fbRef(db, 'articles/'), {
      releaseDate: new Date().getTime(),
      text: articleData.text,
      title: articleData.title,
      authorId: useState<User>('author').value.uid
    }).then((onfulfilled) => {
        const key = onfulfilled.key;
        if (key && articleData.cover) {
            const storage = getStorage();
            const storageRef = fbStorageRef(storage, `article/${key}`);
            uploadBytes(storageRef, articleData.cover)
            .then((snapshot) => {
              console.log('uploaded', snapshot)
            })
            .catch((err) => {
              console.warn('error', err)
            })       
        }

      alert('Artigo criado com sucesso!')
    }).catch((error) => {
      console.error(error);
    })
  }

  function updateArticle(db: Database, articleData: any, articleId: string) {
    update(fbRef(db, `articles/${articleId}`), {
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
  const existingArticle = ref<Article>();
  const coverUrl = ref<string>();

  onMounted(async() => {
    const route = useRoute()
    const articleId = route.query.articleId;
    if (articleId) {
      isLoadingData.value = true
      existingArticle.value = await getArticleFromId(articleId.toString())
      if (existingArticle.value) {
        const storage = getStorage();
        getDownloadURL(fbStorageRef(storage, `article/${articleId.toString()}`))
        .then((res) => {
            coverUrl.value = res;
        })
        .finally(() => {
            isLoadingData.value = false
        })
        return;
      }
      // TODO: handle article not found
    }
  })
</script>
