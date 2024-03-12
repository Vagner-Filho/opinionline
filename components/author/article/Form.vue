<template>
  <form class="max-w-4xl flex flex-col justify-center m-auto px-2 h-full max-h-[800px]" @submit.prevent="$emit('article', articleData)">
    <input type="text" class="std-author-input w-full h-10 mt-[35px]" v-model="articleData.title" :placeholder="titlePlaceholder" :disabled="isViewOnly" required>
    <!-- <SelectFilter
      :items-filter="tags"
      :filter-id="'tag-selector'" 
      :filter-name="'+ Tag'"
      @newtag="toggleNewTagModal"
      class="max-w-[80px] mt-3"
    /> -->
    <label for="cover-input" class="std-author-input w-full h-14 leading-[3.5rem] text-[#9fa6b2] text-center mt-[90px] mb-1 px-0">
      <img v-if="coverPreview" :src="coverPreview" alt="cover-preview" class="object-cover w-full h-full">
      <div v-else>
        {{ coverPlaceholder }}
      </div>
    </label>
    <input ref="coverInput" type="file" id="cover-input" class="hidden" @change="handleFileChange" />
    <textarea name="text" id="article-text" class="std-author-input py-4" v-model="articleData.text" cols="30" rows="10" :placeholder="articleTextPlaceholder" :disabled="isViewOnly" required></textarea>
    <div class="flex font-josefin-sans my-2">
      <button class="std-btn-shape bg-light-gray drop-shadow-md text-gray text-lg w-28 px-4 h-8" type="button" :disabled="isViewOnly">Cancelar</button>
      <button class="std-btn-shape bg-green-400 drop-shadow-md text-white text-lg w-28 px-4 m-auto h-8" type="submit" :disabled="isViewOnly">Publicar</button>
      <button class="std-btn-shape bg-white drop-shadow-md text-strong-green text-lg w-28 px-4 border-2 border-slate-200 h-8" type="button" @click="$emit('save', articleData)" :disabled="isViewOnly">Salvar</button>
    </div>
    <AuthorNewTagModal :is-visible="newTagModalIsVisible" @destroy="toggleNewTagModal" @tag="handleTag" />
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { getStorage, ref as fbRef, uploadBytes } from "firebase/storage";
import type { ArticleData } from './types';

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
      type: Object,
      required: false
    }
  })
  // const tags = ref([
  //   {
  //     itemId: 0,
  //     itemName: 'Criar tag'
  //   }
  // ])

  const newTagModalIsVisible = ref(false);
  function toggleNewTagModal() {
    newTagModalIsVisible.value = !newTagModalIsVisible.value;
  }

  function handleTag() {
    // TODO: save tag to article on firebase
  }

  const articleData = ref<ArticleData>({
    title: '',
    cover: false, // null might break firebase db
    text: ''
  })

  watchEffect(() => {
    if (props.existingArticle) {
      articleData.value.title = props.existingArticle.title
      articleData.value.text = props.existingArticle.text
      articleData.value.cover = props.existingArticle.cover
    }
  })
  
  const emit = defineEmits<{
    article: [payload: ArticleData]
    save: [payload: ArticleData]
  }>();

  const coverPreview = ref<string>();
  async function handleFileChange(ev: Event) {
    if (ev.target) {
      const inputEl = ev.target as HTMLInputElement
      if (inputEl.files && inputEl.files.length > 0) {
        articleData.value.cover = inputEl.files[0];
        coverPreview.value = URL.createObjectURL(inputEl.files[0])
        // const storage = getStorage();
        // const storageRef = fbRef(storage, inputEl.files[0].name);
        // uploadBytes(storageRef, inputEl.files[0])
        // .then((snapshot) => {
        //   console.log('uploaded', snapshot)
        // })
        // .catch((err) => {
        //   console.warn('error', err)
        // })
      }
    }
    
  }
</script>