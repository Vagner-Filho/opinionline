<template>
  <section :id="'article-card' + articleId" class="article-card" @click="$router.push({ name: 'ArticlePage', query: { id: articleId }})">
    <header>
      <div class="default-author-pic" />
    </header>
    <main>
      <div class="article-head">
        <h1>
          Text title
        </h1>
        <span>dd/mm/yy</span>  
      </div>
      <article>
        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication...
      </article>
    </main>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

  const props = defineProps<{
    backgroundUrl: string
    articleId: number
  }>()

  const setBackgroundCover = (cover: string) => {
    const header: HTMLElement = document.querySelector('#article-card' + props.articleId + ' > header')!
    header.style.cssText = `
      background: url('${cover}') no-repeat center center;
      background-size: cover;
    `
  }
  onMounted(() => {
    setBackgroundCover(props.backgroundUrl)
  })
</script>

<style scoped lang="scss">
  section.article-card {
    height: 100%;
    width: 100%;
    // min-height: 314px;
    min-width: 318px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    background-color: #F2F2F2;
    margin: 10px 0;
    header {
      min-height: 80px;
      position: relative;
    }
    main {
      padding: 0 7px 10px 7px;
      height: 255px;
      div.article-head {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
        margin: 25px 0;
        h1 {
          margin: 0;
        }
        span {
          display: flex;
          align-items: flex-end;
        }
      }
      article {
        text-align: justify;
      }
    }
  }
</style>