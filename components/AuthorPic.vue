<template>
  <img class="w-20 h-20 rounded-full object-cover" id="author-pic" :src="authorPic ?? '/default/authorPic.svg'" alt="foto da autora">
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