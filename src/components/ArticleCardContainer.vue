<template>
  <main v-if="!expandingArticle && !articleExpanded" class="container">
    <button type="button" @click="switchView()">{{ mostReadOrMostActual }}</button>
    <ArticleCard v-for="(article, index) in articles" :key="index"
      :background-url="article.coverUlr"
      :article-id="index"
      @expand-article="expandArticle(index, article.coverUlr)"
    />
  </main>
  <main v-else-if="!expandingArticle && articleExpanded" class="container" id="expanded-article">
    <ExpandedArticle 
      :expanded-article="expandedArticle"
    />
  </main>
  <main v-else-if="expandingArticle && !articleExpanded" class="container">
    <div class="spinner">
      <div class="loader" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import ArticleCard from './ArticleCard.vue';
import ExpandedArticle from './ExpandedArticle.vue';
import { ViewPosition } from '../utils/types';

const articles = reactive([
  {
    coverUlr: '/src/assets/article-card-bg.svg'
  },
  {
    coverUlr: '/src/assets/article-card-bg.svg'
  }
])

const isInMostActual = ref(true)
const switchView = () => {
  isInMostActual.value = !isInMostActual.value
}
const mostReadOrMostActual = computed(() => {
  return isInMostActual.value ? 'Mais lidos' : 'Mais atuais'
})

const expandingArticle = ref(false) // indicates to the reader that the chosen article is loading
const articleExpanded = ref(false)  // controls the view so the expanded version of an article is shown when the data is ready, also hides the container card
const expandedArticle = {
  title: 'Layout Building',
  cover: '/src/assets/article-card-bg.svg',
  tags: ['Economia', 'Educação'],
  authorPic: 'none',
  date: '13/03/2022',
  article: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...'
}

const emit = defineEmits<{
  (e: 'set-position', position: number, coverPath: string): void
}>()
const expandArticle = (id: number, coverPath: string) => {
  expandingArticle.value = true
  // TODO: get article from api
  setTimeout(() => {
    expandingArticle.value = false
    articleExpanded.value = true
    emit('set-position', ViewPosition.ExpandedArticle, coverPath)
  }, 2000);
}
</script>

<style scoped lang="scss">
  main.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    min-height: 300px;
    button {
      text-decoration: underline;
      font-family: 'Josefin-Sans';
      background: none;
      border: none;
      margin-right: auto;
    }
  }
</style>