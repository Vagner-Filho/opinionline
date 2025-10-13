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
        <!--<textarea name="text" id="article-text" class="std-author-input py-4" v-model="articleData.text" cols="30"
            rows="10" :placeholder="articleTextPlaceholder" :disabled="isViewOnly" required></textarea>-->
        <button type="button" @click="handleArticleFormating">N</button>
        <div contenteditable class="size-28" id="article-editor-content">hello</div>
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
    publish: [payload: FormData]
    save: [payload: FormData]
}>();

function handleSubmit(ev: SubmitEvent) {
    console.log('heck')
    const target = ev.target as HTMLFormElement
    const fm = new FormData(target)

    const cover = fm.get('cover') as File
    if (cover.size === 0) {
        fm.delete('cover')
    }

    const submitter = ev.submitter as HTMLButtonElement
    const eventName = submitter.id === 'publish-btn' ? "publish" : "save"
    // @ts-ignore
    emit(eventName, fm)
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

type FormattingOperation = Record<string, () => void>
const operation: FormattingOperation = {
    'STRONG': () => {

    }
}
function handleArticleFormating() {
    const selection = document.getSelection()
    const range = selection?.getRangeAt(0)
    const isStrong = (selection: Selection, range: Range) => {
        if (selection.anchorNode) {
            if ('tagName' in selection.anchorNode && selection.anchorNode.tagName === 'STRONG') {
                return true
            }
            if (selection.anchorNode.parentElement && 'tagName' in selection.anchorNode.parentElement && selection.anchorNode.parentElement === 'STRONG') {
                return true
            }
        }

        if (range.commonAncestorContainer) {
            if ('tagName' in range.commonAncestorContainer && range.commonAncestorContainer.tagName === 'STRONG') {
                return true
            }
            if (range.commonAncestorContainer.parentElement && 'tagName' in range.commonAncestorContainer.parentElement && range.commonAncestorContainer.parentElement.tagName === 'STRONG') {
                return true
            }
        }
    }
    if (selection && range) {
        debugger
        const start = range.startOffset
        const end = range.endOffset
        const selectedText = selection.toString()
        const originalText = range.commonAncestorContainer instanceof HTMLDivElement ? range.commonAncestorContainer.textContent : range.commonAncestorContainer.data

        const formattedSelectedText = '<strong>' + selectedText + '</strong>'
        const formatted = range.commonAncestorContainer instanceof HTMLDivElement ? formattedSelectedText : originalText.substring(0, start) + formattedSelectedText + originalText.substring(end)
        if (range.commonAncestorContainer.nodeType === 1 && 'innerHTML' in range.commonAncestorContainer) {
            range.commonAncestorContainer.innerHTML = formatted
        } else if (isStrong(selection, range)) {
            selection.anchorNode?.parentElement?.replaceWith(selectedText)
        } else if (range.commonAncestorContainer.parentElement && 'innerHTML' in range.commonAncestorContainer.parentElement) {
            range.commonAncestorContainer.parentElement.innerHTML = formatted
        }
    }
}
</script>
