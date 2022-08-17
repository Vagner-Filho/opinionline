<template>
  <div class="w-full flex mt-6">
    <section class="w-2/3 font-josefin-sans">
      <main class="flex flex-col">
        <h1 class="font-semibold text-2xl truncate">
          {{ title }}
        </h1>
        <div id="article-tags" class="flex my-2">
          <ArticleTag v-for="tag in tags" :tag-name="tag" :tag-id="tag.toLocaleLowerCase() + '-tag'"/>
        </div>
      </main>
      <footer>
        <time>{{ releaseDate }}</time>
      </footer>
    </section>
    <div class="w-1/3" id="author-pic">
      <img class="ml-auto" v-if="authorPic" :src="authorPic" :alt="'autor(a) de: ' + title" />
      <img class="ml-auto" v-else src="/default/authorPic.svg" :alt="'autor(a) de: ' + title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleTag from './ArticleTag.vue';
  defineProps<{
    title: string
    tags: string[]
    releaseDate: string
    authorPic: string | null
  }>();
</script>

<style scoped>

</style>