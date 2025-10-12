<template>
  <div>
    <ReaderNavBar v-if="$route.name !== 'auth'" />
    <slot />
  </div>
</template>
