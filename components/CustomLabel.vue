<template>
  <label v-if="labelType === 'checkbox'" :for="isLabelFor">
    <div class="bg-strong-green relative rounded-3xl w-12 px-[4px] h-6 flex justify-start items-center">
      <div class="h-4 w-4 rounded-full border-[1px] border-slate-200 bg-white" />
    </div>
  </label>
</template>

<script setup lang="ts">
  defineProps({
    isLabelFor: {
      type: String,
      default: '',
      required: true
    },
    labelType: {
      type: String,
      default: '',
      required: true
    }
  })
</script>