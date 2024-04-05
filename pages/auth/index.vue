<template>
  <div>
    <form class="shadow-contour shadow-strong-green font-josefin-sans w-[320px] mt-[112px] flex flex-col items-center h-[270px] m-auto rounded-md" @submit.prevent="logUser">
      <input class="w-[276px] h-[30px] mt-[44px] mb-[11px] bg-[#D2D2D2] rounded-md px-2" id="email" type="text" v-model="email" aria-placeholder="e-mail" placeholder="e-mail" required>
      <input class="w-[276px] h-[30px] mb-[16px] bg-[#D2D2D2] rounded-md px-2" id="senha" type="password" v-model="pass" aria-placeholder="senha" placeholder="senha" required>
      <button v-if="!isLoadingData" type="submit" class="confirmation-btn std-btn-shape text-base">Entrar</button>
      <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, type User } from 'firebase/auth';
  import { ref } from 'vue'
  const email = ref<string>('')
  const pass = ref<string>('')

  const { $firebaseApp } = useNuxtApp()

  const auth = getAuth($firebaseApp())

  const isLoadingData = ref(false)
  function logUser() {
    isLoadingData.value = true;
    signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      useState<User>('author', () => userCredential.user);
      const router = useRouter()
      router.push({ name: 'author-article', query: { isNew: '1' } })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.error({ errorCode, errorMessage });
    })
    isLoadingData.value = false;
  }
</script>

<style scoped>

</style>