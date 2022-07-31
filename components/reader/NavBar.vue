<template>
<header id="navbar" class="relative px-2">
  <nav class="w-full">
    <h1 v-if="!hideLogo" class="text-4xl text-center text-black font-great-vibes mt-5">Opinionline</h1>
    <img v-else :src="articleCover" alt="article-cover" class="w-full">
    <div class="flex justify-evenly my-7">
      <button id="home" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'index' }">
        <NuxtLink to="/">Inicio</NuxtLink>
      </button>
      <button id="categories" class="std-btn-shape bg-light-green navbar-btn" type="button">Categorias</button>
      <button id="about" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'about' }">
        <NuxtLink to="/about" id="about">Sobre</NuxtLink>    
      </button>
      <button id="contact" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'contact' }">
        <NuxtLink to="/contact">Contato</NuxtLink>
      </button>
    </div>
  </nav>
</header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

  defineProps<{
    hideLogo: boolean
    articleCover: string
  }>()

  const route = useRoute()
  const routeName = computed(() => route.name)

</script>

<style scoped>
  .bom-dia {
    background-color: black !important
  }
</style>