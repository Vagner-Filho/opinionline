<template>
  <div>
    <button :id="filterId" class="std-btn-shape mx-0 w-full bg-light-green navbar-btn relative" type="button" @click.prevent="toggleOptions($event)">{{ filterName }}</button>    
  </div>
</template>

<script setup lang="ts">
import { ref, h, render } from 'vue'

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
      class: 'absolute max-w-40 w-full bg-light-gray rounded-md px-2 w-fit ml-2 font-josefin-sans',
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
              for: 'item-id-' + i.itemId,
              class: 'whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis mr-2 hover:cursor-pointer'
            },
            i.itemName
          ),
          h(
            'input',
            {
              id: 'item-id-' + i.itemId,
              value: i,
              class: i.itemId === 0 ? 'hidden' : '',
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
  const filterBtn = e.target as HTMLElement;
  const btnParent = filterBtn.parentElement;
  if (btnParent.childElementCount === 1) {
    const ulOptions = renderUlOptions()
    render(ulOptions, btnParent)
  } else {
    const optionsRef = btnParent.querySelector('ul') as HTMLElement
    optionsRef.classList.toggle('hidden')
  }
  filterBtn.classList.toggle('bg-light-gray')
}
</script>