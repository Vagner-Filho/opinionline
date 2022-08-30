<template>
  <div id="modal-panel" v-if="isVisible" class="fixed top-0 left-0 h-screen w-screen z-10 flex justify-center content-center font-josefin-sans">
    <div id="modal-back" class="h-screen w-screen fixed bg-gray opacity-40" @click="destroySelf()" />
    <section id="new-tag" class="px-3 py-5 z-20 m-auto w-[330px] rounded-md drop-shadow-lg border-black bg-white">
      <main>
        <form id="tag-name-form" class="flex-col" @submit.prevent="handleSubmit()">
          <label for="tag-name-input" class="pl-5">Nome da tag</label>
          <input class="std-author-input w-full" id="tag-name-input" type="text" v-model="tagNameInput">
        </form>
      </main>
      <footer class="w-full text-center mt-4">
        <button type="submit" form="tag-name-form" class="text-black std-btn-shape bg-light-green w-24 h-10 drop-shadow-md rounded-md">Criar tag</button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  })

  const emit = defineEmits<{
    (e: 'tag', tagName: string): void
    (e: 'invalid', status: string): void
    (e: 'destroy'): void
  }>()

  const destroySelf = () => {
    emit('destroy')
  }

  const tagNameInput = ref<string>('')
  const handleSubmit = () => {
    if (isValidTagInput(tagNameInput.value)) {
      emit('tag', tagNameInput.value)
    } else {
      // TODO: implement better warning
      emit('invalid', 'Nome da tag inválido')
    }
  }
  const isValidTagInput = (tag: string) => {
    if (!tag) return false
    if (tag.length < 3) return false
    return true
  }

</script>