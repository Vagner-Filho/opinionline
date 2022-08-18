<template>
  <div id="sidebar">
    <nav class="w-16 h-screen fixed left-0 top-0 bg-strong-green z-20">
      <ul>
        <li class="my-4" @click="$router.push({ name: 'author-profile'})">
          <img class="m-auto" src="/author/profile.svg" alt="perfil">
        </li>
        <li class="my-4" @click="$router.push({ name: 'author-home'})">
          <img class="m-auto" src="/author/home.svg" alt="home">
        </li>
        <li class="my-4" @click="$router.push({ name: 'author-article', query: { isNew: '1' }})">
          <img class="m-auto" src="/author/plus.svg" alt="criar artigo">
        </li>
        <li class="my-4" @click="$router.push({ name: 'author-list' })">
          <img class="m-auto" src="/author/open-book.svg" alt="ver artigos">
        </li>
      </ul>
    </nav>
  </div>
</template>