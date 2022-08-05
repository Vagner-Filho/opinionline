<template>
  <section class="rounded-lg drop-shadow-lg" @click="$emit('articleClicked', article.id)">
    <header class="relative">
      <img :src="article.cover" id="cover" alt="">
      <div class="absolute">
        <img id="author-pic" :src="article.authorPic" alt="foto do(a) autor(a)">
      </div>
    </header>
    <main class="px-2">
      <div class="flex">
        <h1>{{ article.title }}</h1>
        <time>{{ article.releaseDate }}</time>
      </div>
      <article>{{ article.preview }}</article>
    </main>
  </section>
</template>

<script setup lang="ts">
  interface IArticle {
    title: string;
    cover: string;
    authorPic: string;
    preview: string;
    releaseDate: string;
    id: number;
  }
  const props = defineProps<{
    article: IArticle;
  }>();
</script>