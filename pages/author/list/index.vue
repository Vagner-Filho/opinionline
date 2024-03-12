<template>
  <div class="max-w-4xl m-auto">
    <section class="font-josefin-sans mt-8">
      <header>
        <h1 class="text-center text-2xl">
          Publicados e Salvos
        </h1>
      </header>
      <main class="flex flex-col mt-5 px-2" v-if="!isLoadingData">
        <div class="ml-auto w-1/2 text-slate-400 text-sm">publicado</div>
        <AuthorArticleListed
          v-for="(art, index) in authorArticles"
          :key="index"
          :title="art.title"
          :is-published="true"
          :id="art.id"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </main>
      <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
    </section>
  </div>
</template>

<script setup lang="ts">
  

  const isLoadingData = ref(false);
  const authorArticles = ref([])
  onMounted( async() => {
    isLoadingData.value = true;
    authorArticles.value = await getArticles();
    const indexedArticles = getArticlesFromIndexedDB();
    if (!(indexedArticles instanceof Error) && indexedArticles) {
      console.log('oi ai')
      authorArticles.value = authorArticles.value.concat(indexedArticles);
    } else if(indexedArticles instanceof Error) {
      console.error(indexedArticles.message);
    }
    isLoadingData.value = false;
  });

  async function handleDelete(id: string) {
    await deleteArticle(id)
    isLoadingData.value = true;
    authorArticles.value = await getArticles()
    isLoadingData.value = false;
  }
  async function handleEdit(id: string) {
    const router = useRouter()
    router.push({ name: 'author-article', query: { isNew: '0', articleId: id } })
  }
  function getArticlesFromIndexedDB() {
    const iDBReq = window.indexedDB.open('opinionline');
    
    let res;
    iDBReq.onsuccess = (e) => {
      const db = iDBReq.result;
      const trans = db.transaction('articles', 'readonly');
      const store = trans.objectStore('articles');
      const articles = store.getAll();
      articles.onsuccess = (e) => {
        res = (e.target as IDBRequest).result;
      }
    }
    iDBReq.onerror = (e) => {
      res = new Error(`error: ${e}`);
    }
    return res;
  }
</script>