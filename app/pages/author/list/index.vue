<template>
    <div class="max-w-4xl m-auto">
        <section class="font-josefin-sans mt-8">
            <header>
                <h1 class="text-center text-2xl">
                    Publicados e Salvos
                </h1>
            </header>
            <main class="flex flex-col mt-5 px-2" v-if="!error">
                <div class="ml-auto w-1/2 text-slate-400 text-sm">publicado</div>
                <AuthorArticleListed v-for="(art, index) in data" :key="index" :title="art.title"
                    :is-released="!!art.releaseDate" :id="art.id" @delete="handleDelete"
                    @release="art.releaseDate = $event" />
            </main>
            <div v-else>
                houve um erro ao carregar os textos
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { Article } from '~~/server/core/entities';

const { data, error } = await useFetch<Array<Required<Article>>>(
    '/api/article/all',
    {
        headers: {
            Authorization: useCookie<string>('token').value
        }
    }
);

function handleDelete(id: number) {
    if (data.value && data.value.length > 0) {
        const deletedId = data.value.findIndex((art) => art.id === id)
        if (deletedId) {
            data.value.splice(deletedId, 1)
        }
    }
}
</script>
