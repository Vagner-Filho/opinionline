<template>
  <section>
    <main class="flex flex-col" v-show="!isLoadingAboutInfo">
      <dl>
        <dt>Autora</dt>
        <dd ref="nameRef">
          name info
        </dd>
        <dt>E-mail</dt>
        <dd ref="emailRef">
          email
        </dd>
        <dt>Quem sou eu</dt>
        <dd ref="whoRef">
          who info
        </dd>
        <dt>Sobre o Opinionline</dt>
        <dd ref="aboutRef">
          about opinionline
        </dd>
        <dt>Informações de Contato</dt>
        <dd ref="contactRef">
          contact info
        </dd>
      </dl>
    </main>
    <Spinner v-show="isLoadingAboutInfo" />
  </section>
</template>

<script setup lang="ts">
const nameRef = ref<HTMLParagraphElement>();
const emailRef = ref<HTMLParagraphElement>();
const whoRef = ref<HTMLParagraphElement>();
const aboutRef = ref<HTMLParagraphElement>();
const contactRef = ref<HTMLParagraphElement>();

const isLoadingAboutInfo = ref(false);
onMounted(async () => {
  isLoadingAboutInfo.value = true;
  const authorProfile = await getAuthorProfile();
  isLoadingAboutInfo.value = false;
  console.log(nameRef.value)

  nameRef.value!.innerText = authorProfile.name
  emailRef.value!.innerText = authorProfile.email
  whoRef.value!.innerText = authorProfile.author
  aboutRef.value!.innerText = authorProfile.opinionline
  contactRef.value!.innerText = authorProfile.contact
})
</script>

<style scoped>
  dt {
    font-size: 1.5rem;
  }
  dd {
    margin-bottom: 10px;
  }
</style>