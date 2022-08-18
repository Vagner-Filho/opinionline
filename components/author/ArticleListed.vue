<template>
  <div :id="articleId">
    <nav>
      <ul class="flex h-12 w-full border-b-2 border-black">
        <li class="w-1/2" @click="$router.push({ name: 'author-article', query: { isViewOnly: '1', articleId: id }})">
          <h1 class="text-2xl truncate h-full leading-[3rem]">{{ title }}</h1>
        </li>
        <li class="w-1/4 text-center flex items-center px-2">
          <CustomLabel :is-label-for="'checkbox-' + articleId" :label-type="'checkbox'" />
          <input type="checkbox" :id="'checkbox-' + articleId" class="hidden" :value="isPublished" @click="$emit('status', id)">
        </li>
        <li class="ml-auto flex items-center justify-end w-1/4">
          <img src="/author/pencil.svg" class="mr-4 w-full max-w-[21px]" alt="editar" @click="$emit('edit', id)">
          <img src="/author/trash.svg" class="w-full max-w-[25px]" alt="excluir" @click="$emit('delete', id)">
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