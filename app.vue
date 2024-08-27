<template>
  <div class="max-w-4xl m-auto">
    <Title>Opinionline</Title>
    <h1 class="text-4xl select-none text-center font-great-vibes mt-5 hover:cursor-default" @click="handleClick">Opinionline</h1>
    <ThemePicker class="absolute top-5" />
    <NuxtLayout :name="!!useCookie('token').value && $route.fullPath.includes('author/') ? 'author' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import './assets/css/tailwind.css';

const router = useRouter();
let counter = 0;
let to: NodeJS.Timeout | null;
function handleClick() {
  if (router.currentRoute.value.name !== 'auth' && !router.currentRoute.value.path.split('/').includes('author')) {
    counter++;
    if (counter === 7) {
      if (to) {
        clearTimeout(to);
      }
      router.push({ path: '/auth' });
      return;
    }

    if (to) {
      clearTimeout(to);
    }

    to = setTimeout(() => {
      counter = 0;
      if (to) {
        clearTimeout(to);
      }
    }, 2000);
  }
}
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
