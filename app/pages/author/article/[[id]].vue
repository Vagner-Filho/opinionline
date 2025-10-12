<template>
    <div class="max-w-4xl m-auto">
        <h2 v-if="$route.params.isViewOnly" class="text-center text-xl">
            Visualização
        </h2>
        <AuthorArticleForm :titlePlaceholder="'Título'" :isViewOnly="$route.query.isViewOnly === '1'"
            :coverPlaceholder="'Adicionar Capa'" :articleTextPlaceholder="'Texto'" :existing-article="data ?? undefined"
            @publish="handleSubmit" @save="handleSubmit($event, false)" />
    </div>
</template>

<script setup lang="ts">
import type { ReleasedArticle } from '~/server/core/entities';

function handleSubmit(articleData: FormData, release: boolean = true) {
    const route = useRoute()
    const articleId = route.params.id;
    if (!articleId) {
        createArticle(articleData, release)
    } else {
        updateArticle(articleData, release, Number(articleId))
    }
}

async function createArticle(article: FormData, release: boolean) {
    const data = article
    data.set('authorId', '1')
    data.set('release', release.toString())
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

async function updateArticle(article: FormData, release: boolean, articleId: number) {
    const fm = article
    fm.set('authorId', '1')
    fm.set('release', release.toString())
    if (data && data.value) {
        fm.set('releaseDate', !!data.value.releaseDate ? data.value.releaseDate.toString() : 'null')
    }
    fm.set('id', articleId.toString())
    await $fetch('/api/article', {
        method: "PUT",
        body: fm,
        headers: {
            "Authorization": useCookie<string>('token').value
        }
    })
}


const route = useRoute()
const articleId = route.params.id;

const { data, status } = !!articleId ? await useFetch<Required<ReleasedArticle>>(`/api/article/${route.params.id}`) : { data: null, status: 'idle' }
</script>
