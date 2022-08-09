import { mount } from '@vue/test-utils'
import { computed, h, ref, render } from 'vue'
import SelectFilter from "../../components/SelectFilter.vue";
describe('Select Filter', () => {
  const mockItemsFilter = [
    {
      itemId: 1,
      itemName: 'Cat 1'
    },
    {
      itemId: 2,
      itemName: 'Cat 2'
    }
  ]
  const wrapper = mount(SelectFilter, {
    props: {
      itemsFilter: mockItemsFilter,
      filterId: 'categories',
      filterName: 'Categorias'
    },
    global: {
      mocks: {
        h: h,
        computed: computed,
        ref: ref,
        render: render
      }
    }
  })
  test('background color changes when filter is opened', async () => {
    await wrapper.trigger('click')

    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('bg-light-gray')
  })
  test('renders items by props', async () => {
    const expectedCategories = ['Cat 1', 'Cat 2']
    await wrapper.trigger('click')
    
    const renderedCategories = wrapper.findAll('label').map((lb) => lb.text())
    expect(renderedCategories).toEqual(expect.arrayContaining(expectedCategories))
  })
  test('emits chosen items', async () => {
    await wrapper.find('#item-id-1').trigger('click')
    await wrapper.find('#item-id-2').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('checked')
    expect(wrapper.emitted().checked[1][0]).toEqual(mockItemsFilter)
  })
})