<template>
    <div class="max-w-4xl m-auto">
        <section class="font-josefin-sans mt-8">
            <header>
                <h1 class="text-center text-2xl">
                    Perfil
                </h1>
            </header>
            <main v-show="!error" class="flex flex-col mt-5 px-2">
                <form @submit.prevent="handleSubmit">
                    <div class="my-2">
                        <label class="text-2xl flex items-center hover:cursor-pointer" for="author-image">
                            <AuthorPic :author-pic="authorPic" class="mr-2" />
                            Alterar Foto
                        </label>
                        <input type="file" name="authorPic" id="author-image" class="hidden"
                            @change="authorPic = getFilePreviewFromEvent($event)">
                    </div>
                    <div class="my-2 flex flex-col">
                        <label class="text-2xl px-2" for="author-name">Nome</label>
                        <input type="text" v-model="aboutPayload.name" id="author-name"
                            class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour"
                            name="name" />
                    </div>
                    <div class="my-2 flex flex-col">
                        <label class="text-2xl px-2" for="author-email">E-mail</label>
                        <input type="email" v-model="aboutPayload.email" id="author-email"
                            class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour"
                            name="email" />
                    </div>
                    <div class="my-2 flex flex-col">
                        <label class="text-2xl px-2" for="about-author">Quem sou eu</label>
                        <textarea v-model="aboutPayload.bio"
                            class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour"
                            name="author" id="about-author" />
                    </div>
                    <div class="my-2 flex flex-col">
                        <label class="text-2xl px-2" for="about-opinionline">Sobre o Opinionline</label>
                        <textarea v-model="aboutPayload.opinionline"
                            class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour"
                            name="opinionline" id="about-opinionline" />
                    </div>
                    <div class="my-2 flex flex-col">
                        <label class="text-2xl px-2" for="contact-info">Informações de contato</label>
                        <textarea v-model="aboutPayload.contact"
                            class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour"
                            name="contact" id="contact-info" />
                    </div>
                    <div class="w-full text-center">
                        <button type="submit" class="std-btn-shape confirmation-btn">
                            Salvar
                        </button>
                    </div>
                </form>
            </main>
        </section>
    </div>
</template>

<script setup lang="ts">
import { getFilePreviewFromEvent } from '~/utils';
import type { AboutSys } from '~/server/core/entities';

const aboutPayload = ref<Partial<AboutSys>>({});
const { data, error } = await useFetch<AboutSys>('/api/about');

aboutPayload.value = { ...data.value }

const authorPic = ref('');

async function handleSubmit() {
    console.log(await useFetch('/api/about', { method: 'PATCH', body: aboutPayload.value }))
}
</script>
