<template>
  <div class="max-w-4xl m-auto">
    <ReaderNavBar :is-reader="true" />
    <section class="px-2" v-if="!isLoadingData">
      <header>
        <ReaderHomeStateIndicator />
      </header>
      <main class="flex flex-col pt-7">
        <ReaderArticleCard v-for="(art, index) in articles" :key="index" :article="art" class="mb-6" @articleClicked="handleClick"/>
      </main>
    </section>
    <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
  </div>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, onValue } from "firebase/database";

  function handleClick(article) {
    const router = useRouter();
    router.push({ path: `article/${article.id}` })
  }
  
  const isLoadingData = ref(false);
  const articles = ref();
  onMounted(() => {
    isLoadingData.value = true
    const { $firebaseApp } = useNuxtApp()

    const db = getDatabase($firebaseApp())
    const articlesRef = fbRef(db, 'articles');
    onValue(articlesRef, (snapshot) => {
      articles.value = transformRawArticle(snapshot.val())
      isLoadingData.value = false
    })
  })
</script>