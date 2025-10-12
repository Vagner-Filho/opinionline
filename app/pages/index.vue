<template>
    <div class="max-w-4xl m-auto">
        <section class="px-2">
            <main class="flex flex-col pt-7" v-if="data && data.length > 0 && !error">
                <ReaderArticleCard
                    v-for="(art, index) in data"
                    :key="index"
                    :title="art.title"
                    :text="art.text"
                    :cover="art.cover"
                    :release-date="art.releaseDate"
                    :author-pic="art.picture"
                    class="mb-6"
                    @click="handleClick(art.id)"
                    @keypess.enter="handleClick(art.id)"
                />
            </main>
            <main v-else class="text-center">
                No momento, nenhum artigo foi encontrado.
            </main>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { ReleasedArticle } from '~/server/core/entities';
const { data, error } = await useFetch<Array<ReleasedArticle>>('/api/article');

function handleClick(articleId: number) {
    const router = useRouter();
    router.push({ path: `article/${articleId}` })
}
</script>
