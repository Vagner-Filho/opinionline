<template>
  <div class="max-w-4xl m-auto">
    <Title>Opinionline</Title>
    <ReaderNavBar :is-reader="true" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import './assets/css/tailwind.css';
</script>

<style>
  body {
    margin: auto;
  }

  svg {
    width: 24px;
    height: 24px;
  }
</style>