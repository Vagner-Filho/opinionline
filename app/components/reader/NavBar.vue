<template>
  <header id="navbar" class="relative px-2">
    <nav class="w-full">
      <div class="flex justify-around my-7 text-black">
        <NuxtLink id="home" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': $route.name === 'index' }" to="/">Início</NuxtLink>
        <NuxtLink id="about" class="std-btn-shape navbar-btn navbar-button-hover" :class="{ 'bg-strong-green text-white': $route.name === 'about' }" to="/about">Sobre</NuxtLink>
      </div>
    </nav>
  </header>
</template>