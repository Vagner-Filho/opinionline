<template>
  <div>
    <ReaderNavBar
      :is-reader="false"
    />
    <AuthorArticleForm
      :titlePlaceholder="'Título'"
      :isViewOnly="$route.query.isViewOnly === '1'"
      :isLoadingData="false"
      :coverPlaceholder="'Adicionar Capa'"
      :articleTextPlaceholder="'Texto'"
      :existing-article="existingArticle"
      @article="handleSubmit"
    />
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
      // getCover()
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
  
  const coverInput = ref(null)
  // function getCover() {
  //   if (!coverInput.value.files[0]) {
  //     return null;
  //   }
  //   const lbl = document.querySelector('label');
  //   lbl.textContent = 'Capa Carregada'
  //   const file = coverInput.value.files[0]
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     articleData.value.cover = e.target.result
  //   }
  //   reader.readAsDataURL(file);
  // }

  const isLoadingData = ref(false)
  const existingArticle = ref({})
  onMounted(async() => {
    const route = useRoute()
    if (route.query.isNew === '0' || route.query.isViewOnly === '1') {
      console.log('poxa')
      isLoadingData.value = true
      existingArticle.value = await getArticleFromId(route.query.articleId)
      isLoadingData.value = false
    }
  })
</script>