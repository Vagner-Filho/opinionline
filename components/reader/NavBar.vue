<template>
<header id="navbar" class="relative px-2">
  <nav class="w-full">
    <button v-if="!isReader" class="absolute top-2 left-2" @click="sidebarIsVisible = true">
      <img src="/author/side-menu.svg" alt="menu lateral">
    </button>
      <AuthorSidebar v-if="sidebarIsVisible"/>
      <div v-if="sidebarIsVisible" class="w-full h-screen fixed top-0 left-16" @click="sidebarIsVisible = false" />
    <h1 class="text-4xl text-center text-black font-great-vibes mt-5">Opinionline</h1>
    <div v-if="isReader" class="flex justify-evenly my-7">
      <button id="home" class="std-btn-shape bg-light-green navbar-btn" type="button" :class="{ 'bg-light-gray text-gray': routeName === 'index' }">
        <NuxtLink to="/">Início</NuxtLink>
      </button>
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
        :filter-name="'Categorias'"
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