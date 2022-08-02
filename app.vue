<template>
  <div>
    <ReaderNavBar
      :hide-logo="false"
      article-cover="https://picsum.photos/id/1/1920/1080"
    />
  </div>
  <NuxtLink to="/exp">Experiment</NuxtLink>
  <NuxtPage />
</template>

<script setup lang="ts">
import './assets/css/tailwind.css'
</script>

<style>
  body {
    max-width: 1536px;
    margin: auto;
  }
</style>