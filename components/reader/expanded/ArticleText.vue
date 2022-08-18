<template>
  <article>
    {{ articleText }}
  </article>
</template>

<script setup lang="ts">
  const props = defineProps<{
    articleText: string;
  }>();

</script>