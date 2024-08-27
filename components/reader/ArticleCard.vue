<template>
    <section
        class="rounded-md ring-1 ring-light-gray/70 dark:ring-white/30 base-shadow-transition shadow-hover shadow-focus focus:outline-none hover:cursor-pointer min-h-[270px] font-josefin-sans"
        tabindex="0">
        <header class="relative rounded-t-md dark:bg-black bg-stone-100">
            <div v-if="!cover" class="flex items-center justify-center text-4xl select-none text-center font-great-vibes dark:text-white text-black h-20 hover:cursor-default">
                Opinionline</div>
            <img v-else class="h-20 object-cover mx-auto w-full rounded-t-md" :src="cover" id="cover" :alt="title + ' cover'" />
            <div class="absolute -bottom-5 left-5">
                <AuthorPic :author-pic="authorPic" />
            </div>
        </header>
        <main class="px-2 mt-7">
            <div class="flex h-9 leading-9">
                <h1 class="text-bold text-2xl w-2/3 truncate">{{ title }}</h1>
                <time class="w-1/3 text-right">{{ getUserReadableDate(releaseDate) }}</time>
            </div>
            <article class="max-h-40 overflow-y-hidden py-3">{{ text }}</article>
        </main>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUserReadableDate } from '#imports';

export default defineComponent({
    name: "ArticleCard",
    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        releaseDate: {
            type: Number,
            required: true
        },
        authorPic: {
            type: String,
            required: true
        }
    },
    setup() {
        return {
            getUserReadableDate,
        }
    }
})
</script>
