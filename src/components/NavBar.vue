<template>
<header id="navbar">
  <nav>
    <h1 v-if="!hideLogo" class="logo-text m-0">Opinionline</h1>
    <img v-else :src="articleCover" alt="article-cover">
    <div class="menu-container w-100">
      <button id="home" class="light-green-bg" :class="{'selected-button': controls.userPosition.value === 0}" type="button" @click="controls.setUserPosition(UserPosition.Initial, '')">Inicio</button>
      <button id="categories" class="light-green-bg" :class="{'selected-button': controls.userPosition.value === 1}" type="button" @click="controls.setUserPosition(UserPosition.Category, '')">Categorias</button>
      <button id="about" class="light-green-bg" :class="{'selected-button': controls.userPosition.value === 2}" type="button" @click="controls.setUserPosition(UserPosition.About, '')">Sobre</button>
      <button id="contact" class="light-green-bg" :class="{'selected-button': controls.userPosition.value === 3}" type="button" @click="controls.setUserPosition(UserPosition.Contact, '')">Contato</button>
    </div>
  </nav>
</header>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { UserPosition, ViewControllerInterface } from '../utils/types';
import { viewControllerKey } from '../utils/keys';
  defineProps<{
    hideLogo: boolean
    articleCover: string
  }>()
  const unwrapControllerProvider = () => {
    const x = inject<ViewControllerInterface>(viewControllerKey)
    if (x) {
      return x
    }
    const y: ViewControllerInterface = {
      userPosition: ref(0),
      setUserPosition: () => {} // FIXME: find a better way to handle it
    }
    return y
  }
  // let controls: ViewControllerInterface = {
  //   userPosition: 0,
  //   setUserPosition: () => {
  //     console.log('lel')
  //   }
  // }
  // onMounted(() => {
  //   controls = unwrapControllerProvider()
  // })
  const controls = unwrapControllerProvider()
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