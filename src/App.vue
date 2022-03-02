<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style lang="scss">
@font-face {
  font-family: "Great-Vibes";
  src: url(./assets/fonts/GreatVibes-Regular.ttf);
}
@font-face {
  font-family: "Josefin-Sans";
  src: url(./assets/fonts/JosefinSans-VariableFont_wght.ttf);
}
#app {
  font-family: Josefin-Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
