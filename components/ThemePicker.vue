<template>
  <USelectMenu :options="themes" v-model="$colorMode.preference" value-attribute="id" :ui-menu="{ base: 'w-[180px]', transition: { leaveActiveClass: 'duration-1000'} }">
      <div id="toggler">
        <UIcon class="hover:scale-125 transition-transform duration-500 ease-in-out transform-gpu" :name="themes.find((theme) => theme.id === $colorMode.preference)!.icon ?? 'system'" />
      </div>
  </USelectMenu>
</template>

<script setup lang="ts">

const themes = [
  {
    id: 'dark',
    label: 'Escuro',
    icon: 'i-material-symbols-dark-mode'
  },
  {
    id: 'light',
    label: 'Claro',
    icon: 'material-symbols:light-mode'
  },
  {
    id: 'system',
    label: 'Padrão Sistema',
    icon: 'i-fluent-dark-theme-24-regular'
  }
]

</script>