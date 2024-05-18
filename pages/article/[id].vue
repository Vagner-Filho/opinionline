<template>
  <section class="max-w-4xl m-auto">
    <main class="px-2" v-if="!isLoadingData">
      <img :src="fullArticle.cover ?? 'default-cover'" class="h-24 w-full rounded-md" />
      <ReaderExpandedArticleInfo :author-pic="null" :release-date="fullArticle.releaseDate" :title="fullArticle.title" :tags="['teste']" />
      <article>
          {{ fullArticle.text }}
      </article>
    </main>
    <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
  </section>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, child, get } from "firebase/database";
  import { onMounted, ref } from 'vue'

  onMounted(() => {
    setTimeout(() => {
      getFullArticle()
    }, 2000);
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
