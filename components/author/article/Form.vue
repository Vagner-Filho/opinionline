<template>
  <form class="max-w-4xl flex flex-col justify-center m-auto px-2 h-full max-h-[800px]" @submit.prevent="$emit('article', articleData)">
    <input type="text" class="std-author-input w-full h-10 mt-[35px]" v-model="articleData.title" :placeholder="titlePlaceholder" :disabled="isViewOnly" required>
    <SelectFilter
      :items-filter="tags"
      :filter-id="'tag-selector'" 
      :filter-name="'+ Tag'"
      class="max-w-[80px] mt-3"
    /> 
    <label for="cover-input" class="std-author-input w-full h-14 leading-[3.5rem] text-[#9fa6b2] text-center mt-[90px] mb-1">{{ coverPlaceholder }}</label>
    <input ref="coverInput" type="file" id="cover-input" class="hidden" disabled>
    <textarea name="text" id="article-text" class="std-author-input py-4" v-model="articleData.text" cols="30" rows="10" :placeholder="articleTextPlaceholder" :disabled="isViewOnly" required></textarea>
    <button class="std-btn-shape bg-green-400 drop-shadow-md text-white text-lg h-7 w-fit px-4 m-auto my-2" type="submit" :disabled="isViewOnly">Publicar</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

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
  const articleData = ref({
    title: '',
    cover: false, // null might break firebase db
    text: ''
  })
  const tags = ref([
    {
      itemId: 0,
      itemName: 'Criar tag'
    }
  ])


  watchEffect(() => {
    if (props.existingArticle) {
      articleData.value.title = props.existingArticle.title
      articleData.value.text = props.existingArticle.text
      articleData.value.cover = props.existingArticle.cover
    }
  })
  
</script>