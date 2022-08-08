<template>
  <div :id="loadingIndicatorId" v-if="isLoading">
    <div class="loading-indicator">
      <div class="animation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true,
      default: false  
    },
    loadingIndicatorId: {
      type: String,
      required: true,
      default: 'loading-indicator-0'  
    },
    loadingMessage: {
      type: String,
      required: false,
      default: 'Demora inesperada. Por favor, aguarde...'
    }
  });
  let t;
  watchEffect(() => {
    if (props.isLoading) {
      t = setTimeout(() => {
        const li = document.querySelector(`#${props.loadingIndicatorId}`)
        const m = document.createElement('mark')
        m.textContent = props.loadingMessage
        li.append(m)
      }, 5000);
    } else {
      clearTimeout(t)
    }
  })
</script>

<style scoped>

</style>