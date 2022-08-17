<template>
  <div>
    <ReaderNavBar
      :is-reader="false"
    />
    <AuthorArticleForm
      :titlePlaceholder="'Título'"
      :isViewOnly="false"
      :isLoadingData="false"
      :coverPlaceholder="'Adicionar Capa'"
      :articleTextPlaceholder="'Texto'"
      @article="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, Database, push } from "firebase/database";

  function handleSubmit(articleData) {
    console.log('1');
    const route = useRoute()

    const { $firebaseApp } = useNuxtApp()
    const db = getDatabase($firebaseApp())

    if (route.query.isNew === '1') {
      // getCover()
     createArticle(db, articleData)
    } else {
      // updateArticle()
    }
  }

  async function createArticle(db: Database, articleData) {
    console.log(articleData.title);
    const res = await push(fbRef(db, 'articles/'), {
      authorPic: false,
      cover: false,
      preview: 'new inserted text',
      releaseDate: new Date().toLocaleDateString('pt-br'),
      text: articleData.articleText,
      title: articleData.title
    })
    console.log(res);
  }
  
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
</script>