<template>
  <div id="sidebar">
    <nav>
      <ul>
        <li class="profile" @click="$router.push({ name: 'author-profile'})">
          <img src="/author/profile.svg" alt="perfil">
        </li>
        <li class="home" @click="$router.push({ name: 'author-home'})">
          <img src="/author/home.svg" alt="home">
        </li>
        <li class="create" @click="$router.push({ name: 'author-article', query: { isNew: '1' }})">
          <img src="/author/plus.svg" alt="criar artigo">
        </li>
        <li class="articles" @click="$router.push({ name: 'author-article', query: { isNew: '0' }})">
          <img src="/author/open-book.svg" alt="ver artigos">
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">

</script>