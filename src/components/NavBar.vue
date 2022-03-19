<template>
  <nav>
    <h1 v-if="!hideLogo" class="logo-text m-0">Opinionline</h1>
    <img v-else :src="articleCover" alt="article-cover">
    <div class="menu-container w-100">
      <button class="light-green-bg" :class="{'selected-button': viewPosition === 0}" type="button" @click="$emit('set-position', ViewPosition.Initial)">Inicio</button>
      <button class="light-green-bg" :class="{'selected-button': viewPosition === 1}" type="button" @click="$emit('set-position', ViewPosition.Category)">Categorias</button>
      <button class="light-green-bg" :class="{'selected-button': viewPosition === 2}" type="button" @click="$emit('set-position', ViewPosition.About)">Sobre</button>
      <button class="light-green-bg" :class="{'selected-button': viewPosition === 3}" type="button" @click="$emit('set-position', ViewPosition.Contact)">Contato</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ViewPosition } from '../utils/types';
  defineProps<{
    viewPosition: number
    hideLogo: boolean
    articleCover: string
  }>()
</script>

<style scoped lang="scss">
  nav {
    width: 100vw;
    top: -8px;
    left: -8px;
    position: relative;
    max-width: 1920px;
    img {
      width: 100%
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