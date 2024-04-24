<template>
  <div :id="articleId">
    <nav>
      <ul class="flex h-12 w-full">
        <li class="w-3/5" @click="$router.push({ name: 'author-article', query: { isViewOnly: '1', articleId: id }})">
          <h1 class="text-2xl truncate h-full leading-[3rem] hover:cursor-pointer">{{ title }}</h1>
        </li>
        <li class="w-1/5 text-center flex items-center px-2">
          <CustomLabel class="hover:cursor-pointer" :is-label-for="'checkbox-' + articleId" :label-type="'checkbox'" />
          <input type="checkbox" :id="'checkbox-' + articleId" class="hidden" :value="isPublished" @click="$emit('status', id)">
        </li>
        <li class="ml-auto w-1/5 flex items-center justify-end">
          <UIcon name="i-heroicons-pencil-solid" class="mr-4" @click="$router.push({ name: 'author-article', query: { isViewOnly: '0', articleId: id }})" />
          <UIcon name="i-heroicons-trash-solid" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  const articleId = computed(() => {
    return `article-${props.id}`
  })

  const props = defineProps({
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
