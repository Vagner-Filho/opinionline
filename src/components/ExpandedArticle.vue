<template>
  <section class="expanded-article">
    <header>
      <div class="header-info">
        <h1>{{ expandedArticle.title }}</h1>
        <aside>
          <div class="default-author-pic" />
        </aside>
      </div>
      <div class="tags-container">
        <span v-for="(tag, index) in expandedArticle.tags" :key="index" class="highlight-green">{{ tag }}</span>
      </div>
      <time>{{ expandedArticle.date }}</time>
    </header>
    <main>
      <article>
        {{ expandedArticle.article }}
      </article>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

  const props = defineProps<{
    expandedArticle: {
      title: string
      cover: string
      tags: string[]
      authorPic: string
      date: string
      article: string
    }
  }>()

  const tags = ref([
    'Economia', 'Educação'
  ])
</script>

<style scoped lang="scss">
  section.expanded-article {
    header {
      h1 {
        font-family: 'Josefin-Sans';
      }
      .tags-container {
        margin-bottom: 20px;
        span {
          border-radius: 25px;
          color: #000;
          font-family: 'Josefin-Sans';
          font-size: 0.8rem;
          padding: 5px 10px;
        }
      }
    }
    main {
      margin-top: 20px;
    }
  }
  .header-info {
    display: flex;
    h1 {
      width: 80%;
    }
    aside {
      width: 20%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .default-author-pic {
      position: unset;
    }
  }
</style>