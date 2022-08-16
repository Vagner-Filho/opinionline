<template>
  <div :id="articleId">
    <nav>
      <ul class="flex w-full">
        <li class="w-1/2">
          <h3>{{ title }}</h3>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const articleId = computed(() => {
  return `article-${props.articleId}`
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
    articleId: {
      type: Number,
      default: 0,
      required: true
    }
  })
</script>