<template>
    <div class="max-w-4xl m-auto">
        <h2 v-if="$route.query.isViewOnly && $route.query.isViewOnly === '1'" class="text-center text-xl">
            Visualização
        </h2>
        <AuthorArticleForm v-if="!isLoadingData" :titlePlaceholder="'Título'"
            :isViewOnly="$route.query.isViewOnly === '1'" :coverPlaceholder="'Adicionar Capa'"
            :articleTextPlaceholder="'Texto'" :existing-article="existingArticle" :cover-url="coverUrl"
            @article="handleSubmit" />
        <Spinner class="mt-32 mx-auto" v-if="isLoadingData" />
    </div>
</template>

<script setup lang="ts">
import type { ArticleData } from "~/components/author/article/types";
import type { Article } from "~/server/core/entities";

function handleSubmit(articleData: ArticleData) {
    const route = useRoute()
    const articleId = route.query.articleId;
    if (!articleId) {
        createArticle(articleData)
    } else {
        //      updateArticle(db, articleData, articleId.toString())
    }
}

async function createArticle(article: ArticleData) {
    const data = new FormData()
    data.set('title', article.title)
    data.set('text', article.text)
    if (article.cover) {
        data.set('cover', article.cover)
    }
    data.set('authorId', '1')
    const token = useCookie<string>('token')
    if (token.value) {
        await $fetch('/api/article', {
            method: "POST",
            body: data,
            headers: {
                "Authorization": token.value
            }
        })
    }
}

const isLoadingData = ref(false);
const existingArticle = ref();
const coverUrl = ref<string>();

onMounted(async () => {
    const route = useRoute()
    const articleId = route.query.articleId;
    if (articleId) {
        isLoadingData.value = true
        // existingArticle.value = await getArticleFromId(articleId.toString())
        if (existingArticle.value) {
        }
        // TODO: handle article not found
    }
})
</script>
