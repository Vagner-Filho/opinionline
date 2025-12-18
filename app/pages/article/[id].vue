<template>
    <section class="max-w-4xl m-auto">
        <main class="px-2" v-if="status !== 'pending' && !!articleData">
            <img :src="articleData.cover ?? 'default-cover'" class="h-24 w-full rounded-md" />
            <ReaderExpandedArticleInfo :author-pic="'/author/default_author.png'"
                :release-date="articleData.releaseDate" :title="articleData.title" />
            <article>
                {{ articleData.text }}
            </article>
        </main>
        <Spinner class="mt-32 mx-auto" v-if="status === 'pending'" />
    </section>
</template>

<script setup lang="ts">
import type { ReleasedArticle } from '~~/server/core/entities';

const props = defineProps({
    article: {
        type: Object as () => ReleasedArticle,
        required: false
    }
})

const route = useRoute();
const { data, status } = await useFetch<ReleasedArticle>(`/api/article/${route.params.id}`, {
    immediate: !props.article
});

const articleData = props.article ?? data.value;
</script>
