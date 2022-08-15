<template>
  <div id="modal-panel" v-if="isVisible" class="fixed h-full w-full bg-slate-600 opacity-5 flex justify-center items-center z-10" @click="destroySelf()">
    <section id="new-tag" class="px-3 py-5 z-20">
      <main>
        <form id="tag-name-form" class="flex-col" @sumbit.prevent="handleSubmit()">
          <label for="tag-name-input">Nome da tag</label>
          <input id="tag-name-input" type="text" v-model="tagNameInput">
        </form>
      </main>
      <footer class="w-100">
        <button type="submit" form="tag-name-form">Criar tag</button>
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
      alert('Nome da tag inválido')
    }
  }
  const isValidTagInput = (tag: string) => {
    if (!tag) return false
    if (tag.length < 3) return false
    return true
  }

</script>