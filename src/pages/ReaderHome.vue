<template>
  <ArticleCardContainer
    v-show="showArticleCardContainer"
    :user-position="userPosition"
    @set-position="setUserPosition"
  />
  <About v-show="userPosition === UserPosition.About"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, provide, ref } from 'vue';
import { UserPosition, ViewControllerInterface } from '../utils/types';
import { viewControllerKey } from '../utils/keys';
import NavBar from '../components/NavBar.vue';
import ArticleCardContainer from '../components/ArticleCardContainer.vue';
import About from '../components/About.vue'

const userPosition = ref(0) // controls which component the user sees
const hideLogo = ref(false) // controls the logo
const articleCover = ref('...') // sets the article cover that is expanded
const setUserPosition = (pos: number, coverPath: string) => {
  if (pos === UserPosition.ExpandedArticle) {
    hideLogo.value = true
    articleCover.value = coverPath
  }
  userPosition.value = pos;
}

const viewControllers: ViewControllerInterface = {
  userPosition: userPosition,
  setUserPosition: setUserPosition
}

provide(viewControllerKey, viewControllers)

const showArticleCardContainer = computed(() => {
  return (userPosition.value === UserPosition.Contact || userPosition.value === UserPosition.About) ? false : true;
})
</script>

<!-- <style lang="scss">
@font-face {
  font-family: "Great-Vibes";
  src: url(/src/assets/fonts/GreatVibes-Regular.ttf);
}
@font-face {
  font-family: "Josefin-Sans";
  src: url(/src/assets/fonts/JosefinSans-VariableFont_wght.ttf);
}
body {
  margin: 0;
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
.spinner {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border: 7px solid #2DCF3D;
  position: relative;
  .loader {
    width: 58px;
    height: 14px;
    background-color: #fff;
    animation: spin 2s cubic-bezier(0.41, -0.15, 0.58, 1.37) infinite;
    position: absolute;
    top: 43px;
    left: 50px;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
      transform-origin: left;
    }
    to {
      transform: rotate(360deg);
      transform-origin: left;
    }
  }
}
.d-flex {
  display: flex;
}
.f-to-column {
  flex-direction: column;
}
.f-to-row {
  flex-direction: row;
}
</style> -->
