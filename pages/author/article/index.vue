<template>
  <ReaderNavBar
    :is-reader="false"
  />
  <AuthorArticleForm
    :titlePlaceholder="'Título'"
    :isViewOnly="false"
    :isLoadingData="false"
    :coverPlaceholder="'Adicionar Capa'"
    :articleTextPlaceholder="'Texto'"
  />
</template>

<script setup lang="ts">
</script>