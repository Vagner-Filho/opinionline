<template>
  <div :id="articleId">
    <nav>
      <ul class="flex w-full">
        <li class="w-1/2" @click="$router.push({ name: 'author-article', query: { isNew: '0' }})">
          <h3>{{ title }}</h3>
        </li>
        <li>
          <input type="checkbox" :value="isPublished" @click="$emit('status', id)">
        </li>
        <li @click="$emit('edit', id)">
          <img src="public/author/pencil.svg" alt="editar">
        </li>
        <li @click="$emit('delete', id)">
          <img src="public/author/trash.svg" alt="excluir">
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
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
      type: Number,
      default: 0,
      required: true
    }
  })
</script>