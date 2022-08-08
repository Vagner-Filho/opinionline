<template>
  <div class="w-full">
    <section class="w-1/2">
      <main class="flex">
        <h1>
          {{ title }}
        </h1>
        <div id="article-tags" class="flex">
          <ArticleTag v-for="tag in tags" :tag-name="tag"/>
        </div>
      </main>
    </section>
    <div class="w-1/2">
      <img v-if="authorPic" :src="authorPic" :alt="'autor(a) de: ' + title">
      <img v-else :src="defaulAuthorPic" :alt="'autor(a) de: ' + title">
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleTag from './ArticleTag.vue';
  defineProps<{
    title: string
    tags: string[]
    releaseDate: string
    authorPic: string
    defaulAuthorPic: string
  }>();
</script>

<style scoped>

</style>