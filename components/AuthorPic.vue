<template>
  <img class="w-20 h-20 rounded-full object-cover" id="author-pic" :src="authorPic ?? '/author/default_author.png'" alt="foto da autora">
</template>

<script setup lang="ts">
  defineProps({
    authorPic: {
      type: String,
      required: true,
      default: ''
    }
  })
</script>
