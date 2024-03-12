<template>
<header id="navbar" class="relative px-2">
  <ThemePicker />
  <NuxtLink v-if="$route.path === '/'" to="/auth" class="bg-green-300 hover:bg-strong-green transition delay-150 ease-in-out absolute top-0 right-3 text-white px-4 rounded-full font-josefin-sans h-8 pt-[4px]">
    Escrever
  </NuxtLink>
  <nav class="w-full">
    <button v-if="!isReader && $route.name !== 'auth'" class="absolute top-2 left-2" @click="sidebarIsVisible = true">
      <img src="/author/side-menu.svg" alt="menu lateral">
    </button>
    <AuthorSidebar v-if="sidebarIsVisible"/>
    <div v-if="sidebarIsVisible" class="w-full h-screen fixed top-0 left-16" @click="sidebarIsVisible = false" />
    <h1 class="text-4xl text-center font-great-vibes mt-5">Opinionline</h1>
    <div v-if="isReader" class="flex justify-evenly my-7 text-black">
      <NuxtLink id="home" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'index' }" to="/">Início</NuxtLink>
      <SelectFilter
        :items-filter="[
          {
            itemId: 1,
            itemName: 'Esporte'
          },
          {
            itemId: 2,
            itemName: 'Games'
          }
        ]"
        :filter-id="'categories'"
        filter-name="Categorias"
      />
      <NuxtLink id="about" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'about' }" to="/about">Sobre</NuxtLink>
      <NuxtLink id="contact" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'contact' }" to="/contact">Contato</NuxtLink>
    </div>
  </nav>
</header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

defineProps({
  isReader: {
    type: Boolean,
    required: true,
    default: false
  }
})

const sidebarIsVisible = ref(false)
const route = useRoute()
const routeName = computed(() => route.name)

</script>