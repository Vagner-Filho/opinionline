<template>
  <span :id="tagId" class="rounded-xl bg-green-400 px-2">
    {{ tagName }}
  </span>
</template>

<script setup lang="ts">
  defineProps<{
    tagName: string,
    tagId: string
  }>();
</script>