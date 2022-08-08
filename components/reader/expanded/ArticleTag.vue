<template>
  <div id="category-tag">
    {{ tagName }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    tagName: string
  }>();
</script>