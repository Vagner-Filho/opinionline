<template>
  <div class="container">
    <ExpandedArticle 
      :expanded-article="expandedArticle"
    />

  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import ExpandedArticle from '../components/ExpandedArticle.vue';

const expandedArticle = {
  title: 'Layout Building',
  cover: '/src/assets/article-card-bg.svg',
  tags: ['Economia', 'Educação'],
  authorPic: 'none',
  date: '13/03/2022',
  article: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...'
}
</script>

<style scoped lang="scss">
  .container {
    padding: 0 20px;
  }
</style>