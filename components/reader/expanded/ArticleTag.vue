<template>
  <div :id="tagId">
    {{ tagName }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    tagName: string,
    tagId: string
  }>();
</script>