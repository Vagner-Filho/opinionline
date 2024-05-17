<template>
  <div class="max-w-4xl m-auto">
    <section class="px-2" v-if="!isLoadingData">
      <main class="flex flex-col pt-7" v-if="articles.length > 0">
        <ReaderArticleCard
          v-for="(art, index) in articles"
          :key="index"
          :title="art.title"
          :text="art.text"
          :cover="'art.cover'"
          :release-date="new Date().getTime()"
          :author-pic="'no pick'"
          class="mb-6"
          @articleClicked="handleClick(art.id)"
        />
      </main>
      <main v-else>
        No momento, nenhum artigo foi encontrado.
      </main>
    </section>
    <Spinner v-else class="mt-32 mx-auto" />
    <dialog id="takingTooLongDialog" ref="takingTooLongDialogRef">
      <section class="border border-strong-green rounded-md p-3">
        <header class="flex justify-end">
          <button type="button" class="text-3xl" @click="takingTooLongDialogRef?.close()">X</button>
        </header>
        <main>
          Desculpe pela demora inesperada. Aguarde mais pouco...
        </main>
        <footer>
          <button type="button" @click="takingTooLongDialogRef?.close()">
            OK
          </button>
        </footer>
      </section>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { getDatabase, ref as fbRef, onValue } from "firebase/database";
import type { IArticle } from "~/core/entities";

  function handleClick(articleId: string) {
    const router = useRouter();
    router.push({ path: `article/${articleId}` })
  }
  
  const isLoadingData = ref(false);
  const articles = ref<Array<any>>([]);
  const takingTooLongDialogRef = ref<HTMLDialogElement>();
  onMounted(() => {
    isLoadingData.value = true;
    const { $firebaseApp } = useNuxtApp()
    const db = getDatabase($firebaseApp())
    const articlesRef = fbRef(db, 'articles');

    const stopSpinnerAfter10Seconds = setTimeout(() => {
      isLoadingData.value = false;
      articles.value = [];
      clearTimeout(stopSpinnerAfter10Seconds);
    }, 10000);

    const takingTooLongTimeOut = setTimeout(() => {
      if (takingTooLongDialogRef.value) {
        takingTooLongDialogRef.value?.show()
      }
      clearTimeout(takingTooLongTimeOut);
    }, 5000);

    onValue(articlesRef, (snapshot) => {
      articles.value = transformRawArticle(snapshot.val())
      isLoadingData.value = false;
      clearTimeout(takingTooLongTimeOut);
      clearTimeout(stopSpinnerAfter10Seconds);
    }, (error) => {
      console.log('error cb', error)
    })
  })
</script>
