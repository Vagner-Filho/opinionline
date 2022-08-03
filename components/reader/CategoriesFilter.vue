<template>
  <!-- <button id="categories" class="std-btn-shape bg-light-green navbar-btn relative" :class="{ 'bg-light-gray': optionsAreVisible }" type="button" @click="toggleOptions()">
    Categorias
    <ul class="absolute hidden" ref="optionsRef">
      <li v-for="category in categoriesFilter" class="flex" :key="'category-key-' + category.categoryId">
        <label :for="'category-id-' + category.categoryId">{{ category.categoryName }}</label>
        <input v-model="checkedCategories" :id="'category-id-' + category.categoryId" :value="category" type="checkbox" @select="emit('checked', checkedCategories)">
      </li>
    </ul>
  </button> -->
  <button id="categories" class="std-btn-shape bg-light-green navbar-btn relative" type="button" @click.prevent="toggleOptions($event)">Categorias</button>
</template>

<script setup lang="ts">
import { computed, ref, h, render } from 'vue'
// import type { Ref } from 'vue';

const props = defineProps<{
  categoriesFilter: Array<ICategory>;
}>();

interface ICategory {
  categoryId: number,
  categoryName: string
}

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
              vModel: checkedCategories,
              id: 'category-id-' + cat.categoryId,
              value: cat,
              type: 'checkbox',
              onSelect: () => emit('checked', checkedCategories.value)
            }
          )
        ]
      )
    })
  )
}
const optionsRef = ref(null)
function toggleOptions(e: MouseEvent) {
  const categoryBtn = e.target as HTMLElement
  if (categoryBtn.childElementCount === 0) {
    const ulOptions = renderUlOptions()
    render(ulOptions, categoryBtn)
  } else {
    optionsRef.value.classList.toggle('hidden')
  }
  categoryBtn.classList.toggle('bg-light-gray')
}
// const checkedCategories: Ref<Array<ICategory>> = ref()
const checkedCategories = ref<Array<ICategory>>()
const emit = defineEmits<{
  (e: 'checked', args: ICategory[]): void
}>()
</script>