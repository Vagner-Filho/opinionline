<template>
  <div>
    <button @click="handleClick">
      sair
    </button>
    <AuthorSidebar />
    <slot />
  </div>
</template>

<script setup lang="ts">
  function handleClick() {
    clearNuxtState('author')
  }
</script>