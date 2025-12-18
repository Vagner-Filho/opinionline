<template>
    <form class="max-w-4xl flex flex-col justify-center m-auto px-2 h-full max-h-[800px]"
        @submit.prevent="handleSubmit($event as SubmitEvent)">
        <input name="title" type="text" class="std-author-input w-full h-10 mt-[35px]" v-model="articleData.title"
            :placeholder="titlePlaceholder" :disabled="isViewOnly" required>
        <label for="cover-input" :class="{ 'hover:cursor-pointer': !isViewOnly }"
            class="std-author-input dark:bg-[#3b3b3b] w-full h-14 leading-14 text-[#9fa6b2] text-center mt-[90px] mb-1 px-0">
            <img v-if="coverPreview" :src="coverPreview" alt="cover-preview" class="object-cover w-full h-full">
            <div v-else>
                {{ coverPlaceholder }}
            </div>
        </label>
        <input type="file" id="cover-input" name="cover" class="hidden" @change="handleFileChange"
            :disabled="isViewOnly" />
        <div class="flex gap-2 mb-2">
            <UButton icon="i-lucide-bold" color="neutral" variant="subtle" @click="handleArticleFormating('b')" />
            <UButton icon="i-lucide-italic" color="neutral" variant="subtle" @click="handleArticleFormating('i')" />
            <UButton icon="i-lucide-link" color="neutral" variant="subtle" @click="handleArticleFormating('l')" />
            <UButton icon="i-lucide-heading" color="neutral" variant="subtle" @click="handleArticleFormating('h1')" />
            <UButton icon="i-lucide-heading-2" color="neutral" variant="subtle" @click="handleArticleFormating('h2')" />
            <UButton icon="i-lucide-heading-3" color="neutral" variant="subtle" @click="handleArticleFormating('h3')" />
            <UButton icon="i-lucide-align-left" color="neutral" variant="subtle"
                @click="handleArticleFormating('al')" />
            <UButton icon="i-lucide-align-justify" color="neutral" variant="subtle"
                @click="handleArticleFormating('ac')" />
            <UButton icon="i-lucide-align-right" color="neutral" variant="subtle"
                @click="handleArticleFormating('ar')" />
            <UButton icon="i-lucide-list" color="neutral" variant="subtle" @click="handleArticleFormating('ul')" />
            <UButton icon="i-lucide-list-ordered" color="neutral" variant="subtle"
                @click="handleArticleFormating('ol')" />
            <!--<UModal title="Criação de Link" :ui="{ body: 'text-center' }">
                <UButton label="L" color="neutral" variant="subtle" />
                <template #body>
                    <label for="link-url">Insira o link que deseja associar ao texto selecionado</label>
                    <input id="link-url" type="url" v-model="linkValue" autofocus="true"
                        class="block w-full py-0.5 my-1 rounded-sm dark:bg-slate-800"
                        @keypress.enter="handleArticleFormating('l')">
                    <UButton label="Confirmar" color="success" :disabled="!linkValue" class="mt-1"
                        @click="handleArticleFormating('l')" />
                </template>
</UModal>-->
        </div>
        <div id="article-editor-content" class="std-author-input py-4" style="min-height: 25rem;"
            :contenteditable="!isViewOnly"></div>
        <div class="flex font-josefin-sans my-2">
            <button class="std-btn-shape dark:bg-gray-500 bg-light-gray drop-shadow-md text-gray text-lg w-28 px-4 h-8"
                type="button" :disabled="isViewOnly">Cancelar</button>
            <button id="publish-btn"
                class="std-btn-shape bg-green-400 drop-shadow-md text-white text-lg w-28 px-4 m-auto h-8" type="submit"
                :disabled="isViewOnly">Publicar</button>
            <button id="save-btn"
                class="std-btn-shape bg-white drop-shadow-md text-strong-green text-lg w-28 px-4 border-2 border-slate-200 h-8"
                type="submit" :disabled="isViewOnly">Salvar</button>
        </div>
    </form>
</template>

<script lang="ts">
export type ArticlePayload = { content: string, cover: File, title: string, release?: boolean, authorId?: number }
</script>
<script setup lang="ts">
import type { ArticleData } from './types';
import type { ReleasedArticle } from '~~/server/core/entities';

const props = defineProps({
    titlePlaceholder: {
        type: String,
        required: false,
        default: 'Título do artigo'
    },
    isViewOnly: {
        type: Boolean,
        required: true,
        default: false
    },
    coverPlaceholder: {
        type: String,
        required: false,
        default: 'Adicionar Capa'
    },
    articleTextPlaceholder: {
        type: String,
        required: false,
        default: 'Texto'
    },
    existingArticle: {
        type: Object as PropType<ReleasedArticle> | null,
        required: false
    }
})

const articleData = ref<ArticleData>({
    title: props.existingArticle ? props.existingArticle.title : '',
    text: props.existingArticle ? props.existingArticle.text : '',
})

const emit = defineEmits<{
    publish: [payload: ArticlePayload]
    save: [payload: ArticlePayload]
}>();

function handleSubmit(ev: SubmitEvent) {
    const element = document.getElementById('article-editor-content');
    if (element) {
        const content = element.innerHTML;
        if (content) {
            const submitter = ev.submitter as HTMLButtonElement
            const eventName = submitter.id === 'publish-btn' ? "publish" : "save"

            const target = ev.target as HTMLFormElement
            const fm = new FormData(target)
            const cover = fm.get('cover') as File
            const title = fm.get('title') as string
            // @ts-ignore
            emit(eventName, { content: JSON.stringify(content), cover, title })
        }
    }
}

const coverPreview = ref<string>(!!props.existingArticle ? props.existingArticle.cover : '');
async function handleFileChange(ev: Event) {
    if (ev.target) {
        const inputEl = ev.target as HTMLInputElement
        if (inputEl.files && inputEl.files.length > 0) {
            articleData.value.cover = inputEl.files[0];
            if (inputEl.files[0]) {
                coverPreview.value = URL.createObjectURL(inputEl.files[0]);
            }
        }
    }
}

const linkValue = ref('');
function handleArticleFormating(format: string) {
    const commandMap: Record<string, string | (() => void)> = {
        'b': 'bold',
        'i': 'italic',
        'l': () => {
            const selection = document.getSelection();
            if (selection) {
                linkValue.value = prompt("URL: ") ?? '';
                const aTag = `<a class="text-blue-500 font-semibold underline" href="${linkValue.value}" target="_blank">${selection.toString()}</a>`
                document.execCommand('insertHTML', false, aTag);
                linkValue.value = '';
            }
        },
        'h1': () => {
            document.execCommand('formatBlock', false, '<h1>');
        },
        'h2': () => {
            document.execCommand('formatBlock', false, '<h2>');
        },
        'h3': () => {
            document.execCommand('formatBlock', false, '<h3>');
        },
        'ac': () => {
            document.execCommand('justifyCenter', false);
        },
        'al': () => {
            document.execCommand('justifyLeft', false);
        },
        'ar': () => {
            document.execCommand('justifyRight', false);
        },
        'ul': 'insertUnorderedList',
        'ol': 'insertOrderedList'
    };

    const command = commandMap[format as keyof typeof commandMap];
    if (command) {
        if (typeof command === 'string') {
            document.execCommand(command, false);
        } else {
            command();
        }
    }
}
</script>
