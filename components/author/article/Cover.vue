<template>
  <input type="file" class="px-4 border-[#D2D2D2] border-2 font-josefin-sans rounded-md drop-shadow-lg w-full bg-white text-lg text-center" :placeholder="placeholder" :disabled="isViewOnly">
</template>

<script setup lang="ts">
  defineProps({
    isViewOnly: {
      type: Boolean,
      required: true,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Adicionar Capa'
    }
  })
</script>