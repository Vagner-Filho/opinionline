<template>
  <div class="max-w-4xl m-auto">
    <Title>Opinionline</Title>
    <!-- <ReaderNavBar :is-reader="true" /> -->
    <NuxtLayout :name="isAuthorLoggedIn ? 'author' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'firebase/auth';
import './assets/css/tailwind.css';

const isAuthorLoggedIn = useState<User>('author')
watch(isAuthorLoggedIn, () => console.log(isAuthorLoggedIn.value), { deep: true })
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