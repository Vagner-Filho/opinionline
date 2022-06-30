<template>
  <h1>
    {{ name }}
  </h1>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'Bom dia',
    required: false
  }
})

</script>

<style scoped>

</style>