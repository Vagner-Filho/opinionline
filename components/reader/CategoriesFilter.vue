<template>
  <button id="categories" class="std-btn-shape bg-light-green navbar-btn relative" type="button" @click.prevent="toggleOptions($event)">Categorias</button>
</template>

<script setup lang="ts">
import { ref, h, render } from 'vue'
// import type { Ref } from 'vue';

const props = defineProps<{
  categoriesFilter: Array<ICategory>;
}>();

interface ICategory {
  categoryId: number,
  categoryName: string
}
const checkedCategories = ref<Array<ICategory>>([])
const emit = defineEmits<{
  (e: 'checked', args: Array<ICategory>): void
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
              id: 'category-id-' + cat.categoryId,
              value: cat,
              type: 'checkbox',
              onClick: () => {
                if (!checkedCategories.value.find(v => v.categoryId === cat.categoryId)) {
                  checkedCategories.value.push(cat)
                } else {
                  checkedCategories.value = checkedCategories.value.filter(v => v.categoryId !== cat.categoryId)
                }
                emit('checked', checkedCategories.value)
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