<template>
  <label :for="forInput">
    <div class="bg-strong-green rounded-3xl w-12 px-[4px] h-6 flex justify-start items-center">
      <div class="h-4 w-4 rounded-full border-[1px] border-slate-200 bg-white" />
    </div>
  </label>
</template>

<script setup lang="ts">
  defineProps({
    forInput: {
      type: String,
      default: '',
      required: true
    }
  })
</script>
