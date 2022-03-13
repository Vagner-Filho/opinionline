<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
import ArticleCardContainer from './components/ArticleCardContainer.vue';

// variable that controls the which component the user sees
const viewPosition = ref(0)
const hideLogo = ref(false)
const articleCover = ref('...')
const setViewPosition = (pos: number, cover: string) => {
  if (pos === 4) {
    hideLogo.value = true
    articleCover.value = cover
  }
  viewPosition.value = pos;
}
</script>

<template>
  <NavBar 
    :view-position="viewPosition"
    :hide-logo="hideLogo"
    :article-cover="articleCover"
    @set-position="setViewPosition"
  />
  <div class="m-navbar" />
  <ArticleCardContainer
    @set-position="setViewPosition"
  />
</template>

<style lang="scss">
@font-face {
  font-family: "Great-Vibes";
  src: url(/src/assets/fonts/GreatVibes-Regular.ttf);
}
@font-face {
  font-family: "Josefin-Sans";
  src: url(/src/assets/fonts/JosefinSans-VariableFont_wght.ttf);
}
#app {
  font-family: Josefin-Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1920px;
  margin: auto;
}
.logo-text {
  font-family: 'Great-Vibes';
  color: #000;
  font-size: 2.25rem;
  text-align: center;
}
.m-0 {
  margin: 0;
}
.m-auto {
  margin: auto;
}
.w-100 {
  width: 100% !important;
}
.light-green-bg {
  background-color: #CCFFC8;
}
.selected-button {
  color: #494949;
  background-color: #DCDCDC;;
} 
.default-author-pic {
  width: 44px;
  height: 44px;
  border-radius: 50px;
  background-color: lime;
  position: absolute;
  bottom: -22px;
  left: 22px;
}
.highlight-green {
  background-color: #7FFC7C;
}
.m-navbar {
  margin-top: 150px;
}
</style>
