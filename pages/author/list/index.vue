<template>
  <div>
    <ReaderNavBar :is-reader="false" />
    <section class="font-josefin-sans mt-8">
      <header>
        <h1 class="text-center text-2xl">
          Publicados e Salvos
        </h1>
      </header>
      <main class="flex flex-col mt-5">
        <div class="ml-auto w-1/2 text-slate-400 text-sm">publicado</div>
        <AuthorArticleListed
          v-for="(art, index) in authorArticles"
          :key="index"
          :title="art.title"
          :is-published="true"
          :id="art.id"
          @delete="handleDelete"
        />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const authorArticles = ref()
  onMounted( async() => {
    authorArticles.value = await getArticles()
  })

  async function handleDelete(id: string) {
    await deleteArticle(id)
    authorArticles.value = await getArticles()
  }
</script>