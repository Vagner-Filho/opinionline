<template>
  <div>
    <ReaderNavBar
      :hide-logo="false"
      article-cover="https://picsum.photos/id/1/1920/1080"
    />
  </div>
  <NewTagModal :is-visible="true"/>
  <NuxtLink to="/exp">Experiment</NuxtLink>
  <NuxtPage />
</template>

<script setup lang="ts">
import './assets/css/tailwind.css'
import NewTagModal from './components/author/NewTagModal.vue';
</script>

<style>
  body {
    max-width: 1536px;
    margin: auto;
  }
</style>