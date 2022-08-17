<template>
  <div>
    <ReaderNavBar :is-reader="false" />
    <section class="font-josefin-sans">
      <header>
        <h1>
          Publicados e Salvos
        </h1>
      </header>
      <main class="flex flex-col">
        <!-- <AuthorArticleListed /> -->
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const authorArticles = ref()
  onMounted(async() => {
    const articles = await getArticles()
    console.log(articles)
  })
</script>