<template>
  <form class="max-w-4xl flex justify-center px-2" @submit.prevent="handleSubmit">
    <input type="text" class="std-author-input w-full h-10" v-model="articleData.title" :placeholder="titlePlaceholder" :disabled="isViewOnly">
  <button type="submit">Publicar</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps({
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
    isLoadingData: {
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
    }
  })

  const articleData = ref({
    title: '',
    cover: '',
    articleText: ''
  })
  function handleSubmit() {
    console.log(articleData.value.title)
  }
  
</script>