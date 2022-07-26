<template>
<header id="navbar" class="relative px-2">
  <nav class="w-full">
    <h1 v-if="!hideLogo" class="text-4xl text-center text-black font-great-vibes mt-5">Opinionline</h1>
    <img v-else :src="articleCover" alt="article-cover" class="w-full">
    <div class="flex justify-evenly my-7">
      <button id="home" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ '!bg-stone-500': route.name === 'index' }">Inicio</button>
      <button id="categories" class="std-btn-shape bg-light-green navbar-btn" type="button">Categorias</button>
      <button id="about" class="std-btn-shape bg-light-green navbar-btn" type="button">Sobre</button>
      <button id="contact" class="std-btn-shape bg-light-green navbar-btn" type="button">Contato</button>
    </div>
  </nav>
</header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

  defineProps<{
    hideLogo: boolean
    articleCover: string
  }>()

  const router = useRouter()
  const route = useRoute()

</script>