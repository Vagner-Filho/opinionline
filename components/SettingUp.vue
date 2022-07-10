<template>
  <h1 class="bg-red-400 font-black text-5xl">
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