<template>
    <div class="max-w-4xl m-auto">
        <section class="px-2" v-if="!pending">
            <main class="flex flex-col pt-7" v-if="data && data.length > 0 && !error">
                <ReaderArticleCard v-for="(art, index) in data" :key="index" :title="art.title" :text="art.text"
                    :cover="art.cover" :release-date="art.releaseDate" :author-pic="'/author/default_author.png'" class="mb-6"
                    @articleClicked="handleClick(art.id)" />
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
import type { ReleasedArticle } from '~/server/core/entities';
const { data, pending, error } = await useFetch<Array<ReleasedArticle>>('/api/article');

function handleClick(articleId: string) {
    const router = useRouter();
    router.push({ path: `article/${articleId}` })
}

const isLoadingData = ref(false);
const takingTooLongDialogRef = ref<HTMLDialogElement>();
isLoadingData.value = true;

const stopSpinnerAfter10Seconds = setTimeout(() => {
    isLoadingData.value = false;
    clearTimeout(stopSpinnerAfter10Seconds);
}, 10000);

const takingTooLongTimeOut = setTimeout(() => {
    if (takingTooLongDialogRef.value) {
        takingTooLongDialogRef.value?.show()
    }
    clearTimeout(takingTooLongTimeOut);
}, 5000);

isLoadingData.value = false;
clearTimeout(takingTooLongTimeOut);
clearTimeout(stopSpinnerAfter10Seconds);
</script>
