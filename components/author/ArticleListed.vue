<template>
  <div :id="id">
    <nav>
      <ul class="flex h-12 w-full">
        <li class="w-3/5" @click="$router.push({ name: 'author-article', query: { isViewOnly: '1', articleId: id }})">
          <h1 class="text-2xl truncate h-full leading-[3rem] hover:cursor-pointer">{{ title }}</h1>
        </li>
        <li class="w-1/5 text-center flex items-center px-2">
          <CustomLabel class="hover:cursor-pointer" :for-input="'checkbox-' + id" />
          <input type="checkbox" :id="'checkbox-' + id" class="hidden" :value="isPublished" @click="$emit('status', id)">
        </li>
        <li class="ml-auto w-1/5 flex items-center justify-end">
        <button type="button">
          <UIcon name="i-heroicons-pencil-solid" class="std-icon-hover mr-4" @click="$router.push({ name: 'author-article', query: { isViewOnly: '0', articleId: id }})" />
        </button>
        <button type="button">
          <UIcon name="i-heroicons-trash-solid" />
        </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: 'Título',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true
    },
    id: {
      type: String,
      default: '',
      required: true
    }
  })
</script>
