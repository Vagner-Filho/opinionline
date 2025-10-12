<template>
  <div class="w-full flex mt-6">
    <section class="w-2/3 font-josefin-sans">
      <main class="flex flex-col">
        <h1 class="font-semibold text-2xl truncate">
          {{ title }}
        </h1>
        <div v-if="tags" id="article-tags" class="flex my-2">
          <ArticleTag v-for="tag in tags" :tag-name="tag" :tag-id="tag.toLocaleLowerCase() + '-tag'"/>
        </div>
      </main>
      <footer>
        <time>{{ getUserReadableDate(releaseDate) }}</time>
      </footer>
    </section>
    <div class="w-1/3" id="author-pic">
      <AuthorPic :author-pic="authorPic" class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleTag from './ArticleTag.vue';
import { getUserReadableDate } from '#imports';
  defineProps<{
    title: string
    tags?: string[]
    releaseDate: Date | number 
    authorPic?: string
  }>();
</script>

<style scoped>

</style>
