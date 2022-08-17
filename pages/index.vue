<template>
<section class="px-2">
  <header>
    <ReaderHomeStateIndicator />
  </header>
</section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const mockData = ref([
    {
      id: 1,
      title: 'Opinionline',
      description: 'Opinionline é uma rede de notícias e comunicação que tem como objetivo promover a opinião pública e a transparência.',
      image: 'https://picsum.photos/id/1/1920/1080',
      releaseDate: '2020-01-01',
      link: 'https://opinionline.com.br'
    },
    {
      id: 2,
      title: 'Opinionline',
      description: 'Opinionline é uma rede de notícias e comunicação que tem como objetivo promover a opinião pública e a transparência.',
      image: 'https://picsum.photos/id/2/1920/1080',
      releaseDate: '2020-01-01',
      link: 'https://opinionline.com.br'
    },
    {
      id: 3,
      title: 'Opinionline',
      description: 'Opinionline é uma rede de notícias e comunicação que tem como objetivo promover a opinião pública e a transparência.',
      image: 'https://picsum.photos/id/3/1920/1080',
      releaseDate: '2020-01-01',
      link: 'https://opinionline.com.br'
    },
    {
      id: 4,
      title: 'Opinionline',
      description: 'Opinionline é uma rede de notícias e comunicação que tem como objetivo promover a opinião pública e a transparência.',
      image: 'https://picsum.photos/id/4/1920/1080',
      releaseDate: '2020-01-01',
      link: 'https://opinionline.com.br'
    },
  ])
</script>