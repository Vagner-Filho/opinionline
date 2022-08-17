<template>
  <div>
    <ReaderNavBar :is-reader="true" />
    <section class="px-2">
      <header>
        <ReaderHomeStateIndicator />
      </header>
      <main class="flex flex-col pt-7">
        <ReaderArticleCard v-for="(art, index) in articles" :key="index" :article="art" class="mb-6"/>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { getDatabase, ref as fbRef, onValue } from "firebase/database";
  import { ref, onMounted } from 'vue'

  const articles = ref()
  onMounted(() => {
    const { $firebaseApp } = useNuxtApp()

    const db = getDatabase($firebaseApp())
    const articlesRef = fbRef(db, 'articles');
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      articles.value = Object.values(data);
      for (const k in keys) {
        articles.value[k].id = keys[k]
      }
    })
  })
</script>