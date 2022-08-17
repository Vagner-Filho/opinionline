<template>
  <section>
    <header>
      <ReaderNavBar :is-reader="true" />
    </header>
    <main>
      <ReaderExpandedArticleText :article-text="'opaopaopaoppoap'" />
    </main>
  </section>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  onMounted(() => {
    console.log(useState('expandedArticle'))
  })  
</script>