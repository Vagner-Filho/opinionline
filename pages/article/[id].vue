<template>
  <section>
    <header>
      <ReaderNavBar :is-reader="true" />
    </header>
    <main class="px-2" v-if="!isLoadingData">
      <ReaderExpandedArticleCover :article-title="fullArticle.title" :cover-path="null" />
      <ReaderExpandedArticleInfo :author-pic="null" :release-date="fullArticle.releaseDate" :title="fullArticle.title" :tags="['teste']" />
      <ReaderExpandedArticleText :article-text="fullArticle.text" />
    </main>
  </section>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, child, get } from "firebase/database";
  import { onMounted, ref } from 'vue'

  onMounted(() => {
    getFullArticle()
  })

  const isLoadingData = ref(true)
  const fullArticle = ref()
  function getFullArticle() {
    const { $firebaseApp } = useNuxtApp()

    const db = getDatabase($firebaseApp())
    const dbRef = fbRef(db)
    const route = useRoute()
    get(child(dbRef,`articles/${route.params.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        fullArticle.value = snapshot.val()
        isLoadingData.value = false
      } else {
        alert('Article not found')
      }
    }).catch((error) => {
      console.error(error);
    })
  }
</script>