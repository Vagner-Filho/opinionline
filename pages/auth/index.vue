<template>
  <ReaderNavBar :is-reader="false"/>
  <div class="bg-[#F2F2F2] font-josefin-sans w-[320px] mt-[112px] flex flex-col items-center h-[270px] m-auto rounded-md drop-shadow-lg">
    <input class="w-[276px] h-[30px] mt-[44px] mb-[11px] bg-[#D2D2D2] rounded-md drop-shadow-2xl px-2" id="email" type="text" v-model="email" aria-placeholder="e-mail">
    <input class="w-[276px] h-[30px] mb-[16px] bg-[#D2D2D2] rounded-md drop-shadow-2xl px-2" id="senha" type="password" v-model="pass" aria-placeholder="senha">
    <button type="button" @click="$router.push({ name: 'author-article', query: { isNew: '1' } })" class="my-2 bg-light-green rounded-md w-[65px] h-[42px]">Entrar</button>
    <button type="button" @click="createUser" class="mb-[80px] bg-light-green rounded-md w-[90px] h-[42px]">Cadastrar</button>
  </div>
</template>

<script setup lang="ts">
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { ref } from 'vue'
  const email = ref<string>('')
  const pass = ref<string>('')

  const { $firebaseApp } = useNuxtApp()

  const auth = getAuth($firebaseApp())
  function createUser() {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      const user = useState('user', () => userCredential.user);
      const router = useRouter()
      router.push({ name: 'author-article', query: { isNew: '1' } })
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error({ errorCode, errorMessage });
      
    })
  }
  function logUser() {

  }
</script>

<style scoped>

</style>