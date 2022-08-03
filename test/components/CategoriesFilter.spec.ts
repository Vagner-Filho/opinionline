import { mount } from '@vue/test-utils'
import { computed, h, ref, render } from 'vue'
import ReaderCategoriesFilter from "../../components/reader/CategoriesFilter.vue";

jest.mock('h', () => ({
  h: h
}))
jest.mock('computed', () => ({
  computed: computed
}))
jest.mock('ref', () => ({
  ref: ref
}))
jest.mock('render', () => ({
  render: render
}))
describe('Categories Filter', () => {
  const mockCategoriesFilter = [
    {
      categoryId: 1,
      categoryName: 'Cat 1'
    },
    {
      categoryId: 2,
      categoryName: 'Cat 2'
    }
  ]
  const wrapper = mount(ReaderCategoriesFilter, {
    props: {
      categoriesFilter: mockCategoriesFilter
    }
  })
  test('background color changes when filter is opened', async () => {
    await wrapper.trigger('click')

    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('bg-light-gray')
  })
  test('renders categories by props', async () => {
    const expectedCategories = ['Cat 1', 'Cat 2']
    await wrapper.trigger('click')

    const renderedCategories = wrapper.findAll('label').map((lb) => lb.text())
    expect(renderedCategories).toEqual(expect.arrayContaining(expectedCategories))
  })
  test('emits chosen categories', async () => {
    await wrapper.find('#category-id-1').trigger('click')
    await wrapper.find('#category-id-2').trigger('click')

    expect(wrapper.emitted().checked[1]).toEqual(mockCategoriesFilter)
  })
})