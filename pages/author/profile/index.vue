<template>
  <div class="max-w-4xl m-auto">
    <ReaderNavBar :is-reader="false" />
    <section class="font-josefin-sans mt-8">
      <header>
        <h1 class="text-center text-2xl">
          Perfil
        </h1>
      </header>
      <main class="flex flex-col mt-5 px-2" v-if="!isLoadingData">
        <div class="flex justify-start items-center mb-5">
          <AuthorPic :author-pic="authorPic" />
          <div class="text-2xl ml-3">Alterar Foto</div>
        </div>
        <div class="my-2 flex flex-col">
          <label class="text-2xl" for="about-author">Quem sou eu</label>
          <textarea class="border-none p-2" v-model="aboutAuthor.data" name="about-author" id="about-author" cols="30" rows="10" @focusout="handleFocusOut(aboutAuthor)" />
        </div>
        <div class="my-2 flex flex-col">
          <label class="text-2xl" for="about-opinionline">Sobre o Opinionline</label>
          <textarea class="border-none p-2" v-model="aboutOpinionline.data" name="about-opinionline" id="about-opinionline" cols="30" rows="10" @focusout="handleFocusOut(aboutOpinionline)" />
        </div>
        <div class="my-2 flex flex-col">
          <label class="text-2xl" for="contact-info">Informações de contato</label>
          <textarea class="border-none p-2" v-model="contactInfo.data" name="contact-info" id="contact-info" cols="30" rows="10" @focusout="handleFocusOut(contactInfo)" />
        </div>
      </main>
      <LoadingIndicator class="mt-32" :is-loading="isLoadingData"/>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue';
  const isLoadingData = ref(false);

  interface IProfileInfo {
    type: string,
    data: string
  }

  const authorPic = ref('');
  const aboutAuthor: Ref<IProfileInfo> = ref({ type: 'aboutauthor', data: '' });
  const aboutOpinionline: Ref<IProfileInfo> = ref({ type: 'aboutopinionline', data: '' });
  const contactInfo: Ref<IProfileInfo> = ref({ type: 'contactinfo', data: '' });


  function handleFocusOut(profileInfo: IProfileInfo) {
    console.log(profileInfo);
  }

  onMounted( async() => {
    isLoadingData.value = true;
    const authorProfile = await getAuthorProfile();
    if (authorProfile && !(authorProfile instanceof Error)) {
      aboutAuthor.value.data = authorProfile.author;
      aboutOpinionline.value.data = authorProfile.opinionline;
      contactInfo.value.data = authorProfile.contact;
    } else if (authorProfile instanceof Error) {
      console.error(authorProfile.message);
    }
    isLoadingData.value = false;
  })
</script>