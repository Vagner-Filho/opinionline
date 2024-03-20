<template>
  <div>
    <img v-if="!authorPic" id="author-pic" src="/default/authorPic.svg" alt="foto do(a) autor(a)">
    <div v-else>opa</div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    authorPic: {
      type: String,
      required: true,
      default: ''
    }
  })
</script>