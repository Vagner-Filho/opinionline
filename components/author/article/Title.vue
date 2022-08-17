<template>
  <input type="text" class="px-4 border-[#D2D2D2] border-2 font-josefin-sans rounded-md drop-shadow-lg w-full h-10 bg-white text-lg" :placeholder="placeholder" :disabled="isViewOnly" @change="$emit('change', $event)">
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
      default: 'Título do artigo'
    }
  })
</script>