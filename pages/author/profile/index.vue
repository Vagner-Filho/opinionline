<template>
  <div class="max-w-4xl m-auto">
    <section class="font-josefin-sans mt-8">
      <header>
        <h1 class="text-center text-2xl">
          Perfil
        </h1>
      </header>
      <main v-show="!isLoadingData" class="flex flex-col mt-5 px-2">
        <form @submit.prevent="handleSubmit">
          <div class="my-2">
            <label class="text-2xl flex items-center hover:cursor-pointer" for="author-image">
              <AuthorPic :author-pic="authorPic" class="mr-2" />
              Alterar Foto
            </label>
            <input type="file" name="authorPic" id="author-image" class="hidden" @change="authorPic = getFilePreviewFromEvent($event)">
          </div>
          <div class="my-2 flex flex-col">
            <label class="text-2xl px-2" for="author-name">Nome</label>
            <input type="text" required id="author-name" class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour" name="name" />
          </div>
          <div class="my-2 flex flex-col">
            <label class="text-2xl px-2" for="author-email">E-mail</label>
            <input type="email" required id="author-email" class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour" name="email" />
          </div>
          <div class="my-2 flex flex-col">
            <label class="text-2xl px-2" for="about-author">Quem sou eu</label>
            <textarea required class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour" name="author" id="about-author" />
          </div>
          <div class="my-2 flex flex-col">
            <label class="text-2xl px-2" for="about-opinionline">Sobre o Opinionline</label>
            <textarea required class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour" name="opinionline" id="about-opinionline" />
          </div>
          <div class="my-2 flex flex-col">
            <label class="text-2xl px-2" for="contact-info">Informações de contato</label>
            <textarea required class="border-none p-2 rounded-md dark:bg-neutral-800 bg-neutral-100 shadow-contour" name="contact" id="contact-info" />
          </div>
          <div class="w-full text-center">
            <button type="submit" class="std-btn-shape confirmation-btn">
              Salvar
            </button>
          </div>
        </form>
      </main>
      <Spinner class="mt-32 mx-auto" v-if="isLoadingData"/>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getDownloadURL, getStorage, ref as fbStorageRef } from 'firebase/storage';
import { ProfileInfoKey, type ProfileInfo } from '~/composables/pushProfileInfo';
import { getFilePreviewFromEvent } from '~/utils';

  const isLoadingData = ref(false);

  const authorPic = ref('');
  
  type InputEl = HTMLInputElement & HTMLTextAreaElement;

  interface ProfileInfoForm extends InputEl {
    name: keyof ProfileInfo
  }

  const isProfileInfoForm = (value: any): value is ProfileInfoForm => {
    return (
      (value instanceof HTMLTextAreaElement || value instanceof HTMLInputElement)
      && value.name in ProfileInfoKey
    )
  }

  async function handleSubmit(ev: Event) {
    const target = ev.target as HTMLFormElement;
    if (target) {
      const payload = Reflect.ownKeys(target).reduce((reduceTarget, currentValue) => {
        if (typeof currentValue === "string") {
          const maybeEl = target[currentValue];
          if (isProfileInfoForm(maybeEl)) {
            Reflect.defineProperty(
              reduceTarget,
              maybeEl.name,
              {
                value: maybeEl.type !== "file" ? maybeEl.value : maybeEl.files ? maybeEl.files[0] : undefined
              }
            );
          }
        }
        return reduceTarget;
      }, {}) as ProfileInfo;
      pushProfileInfo(payload);
    }
  }

  onMounted( async() => {
    isLoadingData.value = true;
    const authorProfile = await getAuthorProfile();
    if (authorProfile && !(authorProfile instanceof Error)) {
      if (authorProfile.authorPic) {
        const storage = getStorage();
        getDownloadURL(fbStorageRef(storage, `author/picture/${authorProfile.authorPic}`))
        .then((url) => {
          authorPic.value = url;
        })
      }

      for (const key of Reflect.ownKeys(ProfileInfoKey)) {
        if (isNaN(Number(key))) {
          const field = document.querySelector(`[name="${String(key)}"]`);
          if (field && isProfileInfoForm(field) && field.type !== 'file') {
            field.value = authorProfile[key]
          }
        }
      }
    } else if (authorProfile instanceof Error) {
      console.error(authorProfile.message);
    }
    isLoadingData.value = false;
  })
</script>
