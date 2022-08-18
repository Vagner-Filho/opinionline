<template>
  <label v-if="labelType === 'checkbox'" :for="isLabelFor" />
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