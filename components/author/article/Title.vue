<template>
  <input type="text" class="px-4 border-[#D2D2D2] border-2 font-josefin-sans rounded-md drop-shadow-lg w-full h-10 bg-white font-black" aria-placeholder="Título" :disabled="isViewOnly">
</template>

<script setup lang="ts">
  defineProps({
    isViewOnly: {
      type: Boolean,
      required: true,
      default: false
    }
  })
</script>