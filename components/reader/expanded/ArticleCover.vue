<template>
  <div id="article-cover">
    <div v-if="coverPath" :class="'bg-[url(' + coverPath + ')]'" :alt="'capa do artigo: ' + articleTitle" />
    <div v-else class="bg-[url('/default/cover.svg')] h-24 w-full rounded-md bg-center bg-no-repeat bg-cover" :alt="'capa do artigo: ' + articleTitle" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    coverPath: string | null;
    articleTitle: string;
  }>()
</script>