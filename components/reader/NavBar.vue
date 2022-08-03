<template>
<header id="navbar" class="relative px-2">
  <nav class="w-full">
    <h1 class="text-4xl text-center text-black font-great-vibes mt-5">Opinionline</h1>
    <div class="flex justify-evenly my-7">
      <button id="home" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'index' }">
        <NuxtLink to="/">Início</NuxtLink>
      </button>
      <CategoriesFilter
        :categories-filter="[
          {
            categoryId: 1,
            categoryName: 'Esporte'
          },
          {
            categoryId: 2,
            categoryName: 'Games'
          }
        ]"
      />
      <button id="about" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'about' }">
        <NuxtLink to="/about">Sobre</NuxtLink>
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
import CategoriesFilter from './CategoriesFilter.vue';

const route = useRoute()
const routeName = computed(() => route.name)

</script>