<template>
  <header id="navbar" class="relative px-2">
    <nav class="w-full">
      <h1 class="text-4xl text-center font-great-vibes mt-5 hover:cursor-default" @click="handleClick">Opinionline</h1>
      <div v-if="isReader" class="flex justify-around my-7 text-black">
        <NuxtLink id="home" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'index' }" to="/">Início</NuxtLink>
        <NuxtLink id="about" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'about' }" to="/about">Sobre</NuxtLink>
        <!-- <NuxtLink id="contact" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': routeName === 'contact' }" to="/contact">Contato</NuxtLink> -->
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps({
  isReader: {
    type: Boolean,
    required: true,
    default: false
  }
})

const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name)

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