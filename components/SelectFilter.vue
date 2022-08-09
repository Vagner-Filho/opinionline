<template>
  <button :id="filterId" class="std-btn-shape bg-light-green navbar-btn relative" type="button" @click.prevent="toggleOptions($event)">{{ filterName }}</button>
</template>

<script setup lang="ts">
import { ref, h, render } from 'vue'
// import type { Ref } from 'vue';

const props = defineProps<{
  itemsFilter: Array<IFilterItem>;
  filterId: string;
  filterName: string;
}>();

interface IFilterItem {
  itemId: number,
  itemName: string
}
const checkedItems = ref<Array<IFilterItem>>([])
const emit = defineEmits<{
  (e: 'checked', args: Array<IFilterItem>): void
}>()
function renderUlOptions() {
  return h(
    'ul',
    {
      class: 'absolute',
      ref: 'optionsRef'
    },
    props.itemsFilter.map((i) => {
      return h(
        'li',
        {
          class: 'flex',
          key: 'item-key-' + i.itemId
        },
        [
          h(
            'label',
            {
              for: 'item-id-' + i.itemId
            },
            i.itemName
          ),
          h(
            'input',
            {
              id: 'item-id-' + i.itemId,
              value: i,
              type: 'checkbox',
              onClick: () => {
                if (!checkedItems.value.find(v => v.itemId === i.itemId)) {
                  checkedItems.value.push(i)
                } else {
                  checkedItems.value = checkedItems.value.filter(v => v.itemId !== i.itemId)
                }
                emit('checked', checkedItems.value)
              }
            }
          )
        ]
      )
    })
  )
}
function toggleOptions(e: MouseEvent) {
  const filterBtn = e.target as HTMLElement
  if (filterBtn.childElementCount === 0) {
    const ulOptions = renderUlOptions()
    render(ulOptions, filterBtn)
  } else {
    const optionsRef = filterBtn.querySelector('ul') as HTMLElement
    optionsRef.classList.toggle('hidden')
  }
  filterBtn.classList.toggle('bg-light-gray')
}
// const checkedItems: Ref<Array<IFilterItem>> = ref()
</script>