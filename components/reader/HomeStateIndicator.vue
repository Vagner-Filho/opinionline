<template>
  <nav>
    <span @click="handleClick($event)" class="font-josefin-sans hover:cursor-pointer">Ver mais lidos</span>
  </nav>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'click', data: string): void;
  }>()
  const handleClick = (e: MouseEvent) => {
    const el = e.target as HTMLElement
    if (el.textContent === 'Ver mais lidos') {
      emit('click', 'mostRead')
      el.textContent = 'Ver mais recentes'
    } else {
      emit('click', 'mostRecent')
      el.textContent = 'Ver mais lidos'
    }
  }
</script>