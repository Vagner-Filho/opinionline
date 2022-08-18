<template>
  <div :id="loadingIndicatorId" v-if="isLoading" class="font-josefin-sans w-full text-center">
    <div class="border-4 border-strong-green h-10 w-10 rounded-full m-auto">
      <div class="w-6 z-20 h-3 bg-white origin-left animate-spin mt-3 ml-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true,
      default: false  
    },
    loadingIndicatorId: {
      type: String,
      required: false,
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
        const s = document.createElement('span')
        s.textContent = props.loadingMessage
        li.append(s)
      }, 5000);
    } else {
      clearTimeout(t)
    }
  })
</script>