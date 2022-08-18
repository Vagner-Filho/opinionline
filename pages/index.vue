<template>
  <div>
    <ReaderNavBar :is-reader="true" />
    <section class="px-2">
      <header>
        <ReaderHomeStateIndicator />
      </header>
      <main class="flex flex-col pt-7">
        <ReaderArticleCard v-for="(art, index) in articles" :key="index" :article="art" class="mb-6" @articleClicked="handleClick"/>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, onValue } from "firebase/database";
  import { ref, onMounted } from 'vue'

  function handleClick(article) {
    const router = useRouter();
    router.push({ path: `article/${article.id}` })
  }

  const articles = ref()
  onMounted(() => {
    const { $firebaseApp } = useNuxtApp()

    const db = getDatabase($firebaseApp())
    const articlesRef = fbRef(db, 'articles');
    onValue(articlesRef, (snapshot) => {
      articles.value = transformRawArticle(snapshot.val())
    })
  })
</script>