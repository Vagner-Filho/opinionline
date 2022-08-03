<template>
  <button id="categories" class="std-btn-shape bg-light-green navbar-btn relative" type="button" @click.prevent="toggleOptions($event)">Categorias</button>
</template>

<script setup lang="ts">
import { computed, ref, reactive, h, render } from 'vue'
// import type { Ref } from 'vue';

const props = defineProps<{
  categoriesFilter: Array<ICategory>;
}>();

interface ICategory {
  categoryId: number,
  categoryName: string
}
const checkedCategories = reactive<Array<ICategory>>([])
const emit = defineEmits<{
  (e: 'checked', args: ICategory[]): void
}>()
function renderUlOptions() {
  return h(
    'ul',
    {
      class: 'absolute',
      ref: 'optionsRef'
    },
    props.categoriesFilter.map((cat) => {
      return h(
        'li',
        {
          class: 'flex',
          key: 'category-key-' + cat.categoryId
        },
        [
          h(
            'label',
            {
              for: 'category-id-' + cat.categoryId
            },
            cat.categoryName
          ),
          h(
            'input',
            {
              modelValue: checkedCategories,
              id: 'category-id-' + cat.categoryId,
              value: cat,
              type: 'checkbox',
              onSelect: () => {
                emit('checked', checkedCategories)
              }
            }
          )
        ]
      )
    })
  )
}
function toggleOptions(e: MouseEvent) {
  const categoryBtn = e.target as HTMLElement
  if (categoryBtn.childElementCount === 0) {
    const ulOptions = renderUlOptions()
    render(ulOptions, categoryBtn)
  } else {
    const optionsRef = categoryBtn.querySelector('ul') as HTMLElement
    optionsRef.classList.toggle('hidden')
  }
  categoryBtn.classList.toggle('bg-light-gray')
}
// const checkedCategories: Ref<Array<ICategory>> = ref()
</script>