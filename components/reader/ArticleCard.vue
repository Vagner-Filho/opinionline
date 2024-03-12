<template>
  <section class="rounded-md shadow-sm dark:shadow-light-gray shadow-hover hover:cursor-pointer min-h-[270px] font-josefin-sans" @click="$emit('articleClicked', article)">
    <header class="relative">
      <div v-if="!article.cover" class="rounded-t-md h-20 bg-[url('/default/cover.svg')] bg-center bg-no-repeat bg-cover" id="default-cover" alt="default article cover" />
      <img v-else class="h-20 object-cover w-full" :src="articleCoverUrl" id="cover" :alt="article.title + ' cover'" />
      <div class="absolute -bottom-5 left-5">
        <img v-if="article.authorPic" id="author-pic" :src="article.authorPic" alt="foto do(a) autor(a)">
        <img v-else id="author-pic" src="/default/authorPic.svg" alt="foto do(a) autor(a)">
      </div>
    </header>
    <main class="px-2 mt-7">
      <div class="flex h-9 leading-9">
        <h1 class="text-bold text-2xl w-2/3 truncate">{{ article.title }}</h1>
        <time class="w-1/3 text-right">{{ article.releaseDate }}</time>
      </div>
      <article class="max-h-40 overflow-y-hidden py-3">{{ article.text }}</article>
    </main>
  </section>
</template>

<script setup lang="ts">
import type { IArticle } from '~/core/entities';
import { getStorage, ref as fbStorageRef, getDownloadURL } from "firebase/storage";

  const props = defineProps<{
    article: IArticle;
  }>();

  const isLoadingArticleCover = ref(false);
  const articleCoverUrl = ref('');
  onMounted(async () => {
    if (props.article.cover) {
      isLoadingArticleCover.value = true;
      const storage = getStorage();
      getDownloadURL(fbStorageRef(storage, props.article.cover))
        .then((url) => {
          articleCoverUrl.value = url;
        })
        .finally(() => {
          isLoadingArticleCover.value = false;
        })
    }
  })
</script>