<template>
<header id="navbar">
  <nav>
    <h1 v-if="!hideLogo" class="logo-text m-0">Opinionline</h1>
    <img v-else :src="articleCover" alt="article-cover">
    <div class="menu-container w-100">
      <button id="home" class="light-green-bg" :class="{'selected-button': actualUserPosition === UserPosition.Initial}" type="button" @click="goToSelected('ReaderHome', UserPosition.Initial)">Inicio</button>
      <button id="categories" class="light-green-bg" :class="{'selected-button': actualUserPosition === UserPosition.Category}" type="button" @click="goToSelected('Category', UserPosition.Category)">Categorias</button>
      <button id="about" class="light-green-bg" :class="{'selected-button': actualUserPosition === UserPosition.About}" type="button" @click="goToSelected('About', UserPosition.About)">Sobre</button>
      <button id="contact" class="light-green-bg" :class="{'selected-button': actualUserPosition === UserPosition.Contact}" type="button" @click="goToSelected('Contact', UserPosition.Contact)">Contato</button>
    </div>
  </nav>
</header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserPosition } from '../utils/types'

  defineProps<{
    hideLogo: boolean
    articleCover: string
  }>()

  const router = useRouter()
  const goToSelected = (routeName: string, currentUserPosition: UserPosition) => {
    router.push({ name: routeName })
    setActualUserPosition(currentUserPosition)
  }

  const actualUserPosition = ref(0)
  const setActualUserPosition = (currentUserPosition: UserPosition) => {
    actualUserPosition.value = currentUserPosition
  }
</script>

<style scoped lang="scss">
  header#navbar {
    position: relative;
    nav {
      width: 100%;
      top: -8px;
      left: -8px;
      /* position: relative; */
      max-width: 1920px;
      img {
        width: 100%
      }
    }
  }

  .menu-container {
    display: inline-flex;
    justify-content: space-evenly;
    margin: 30px 0 30px 0;
    button {
      border-radius: 20px;
      border: 0;
      min-height: 30px;
      min-width: 75px;
      width: 10%;
      line-height: 30px;
      font-family: 'Josefin-Sans';
    }
  }
</style>