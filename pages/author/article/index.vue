<template>
  <div class="max-w-4xl m-auto">
    <ReaderNavBar
      :is-reader="false"
    />
    <AuthorArticleForm
      v-if="!isLoadingData"
      :titlePlaceholder="'Título'"
      :isViewOnly="$route.query.isViewOnly === '1'"
      :coverPlaceholder="'Adicionar Capa'"
      :articleTextPlaceholder="'Texto'"
      :existing-article="existingArticle"
      @article="handleSubmit"
    />
    <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
  </div>
</template>

<script setup lang="ts">
  import { User } from "firebase/auth";
  import { getDatabase, ref as fbRef, Database, push } from "firebase/database";
  
  function handleSubmit(articleData) {
    const route = useRoute()

    const { $firebaseApp } = useNuxtApp()
    const db = getDatabase($firebaseApp())

    if (route.query.isNew === '1') {
      createArticle(db, articleData)
    } else {
      updateArticle(db, articleData)
    }
  }
  function createArticle(db: Database, articleData) {
    push(fbRef(db, 'articles/'), {
      authorPic: false,
      cover: false,
      preview: 'new inserted text',
      releaseDate: new Date().toLocaleDateString('pt-br'),
      text: articleData.articleText,
      title: articleData.title,
      authorId: useState<User>('user').value.uid
    }).then((onfulfilled) => {
      alert('Artigo criado com sucesso!')
    }).catch((error) => {
      console.error(error);
    })
  }
  function updateArticle(db: Database, articleData) {}

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
</script>