<template>
  <div id="sidebar">
    <nav class="w-16 h-screen fixed left-0 top-0 shadow-lg shadow-light-green z-20">
      <ul>
        <li class="my-4 hover:cursor-pointer text-center" @click="$router.push({ name: 'author-profile' })">
          <UIcon name="i-healthicons-ui-user-profile" class="m-auto w-10 h-10 std-icon-hover" /> 
        </li>
        <li class="my-4 hover:cursor-pointer text-center" @click="$router.push({ path: '/author/article' })">
          <UIcon name="i-ph-plus" class="m-auto w-10 h-10 std-icon-hover" /> 
        </li>
        <li class="my-4 hover:cursor-pointer text-center" @click="$router.push({ name: 'author-list' })">
          <UIcon name="i-ooui-articles-ltr" class="m-auto w-10 h-10 std-icon-hover" /> 
        </li>
        <li class="my-4 hover:cursor-pointer text-center" @click="handleLogout">
          <UIcon name="i-material-symbols-logout" class="m-auto w-10 h-10 std-icon-hover" /> 
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
    function handleLogout() {
        const router = useRouter();
        router.push('/');
        clearNuxtState('author');
    }
</script>
