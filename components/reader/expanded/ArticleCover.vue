<template>
  <div id="article-cover">
    <img v-if="coverPath" :src="coverPath" :alt="'capa do artigo: ' + articleTitle">
    <img v-else :src="defaultCoverPath" :alt="'capa do artigo: ' + articleTitle">
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    coverPath: string | null;
    defaultCoverPath: string;
    articleTitle: string;
  }>()
</script>