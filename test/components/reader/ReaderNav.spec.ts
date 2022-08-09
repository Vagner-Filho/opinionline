import { mount } from "@vue/test-utils";
import { NuxtLink } from "../../../.nuxt/components";
import SelectFilter from "../../../components/SelectFilter.vue";
import ReaderNavBar from "../../../components/reader/NavBar.vue";

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => { return { name: 'index' } }),
  computed: jest.fn()
}))

describe('Reader navigation bar', () => {
  const wrapper = mount(ReaderNavBar, {
    global: {
      components: {
        NuxtLink,
        SelectFilter
      }
    }
  })
  test('renders navigation options', () => {
    const expectedOptions = ['Início', 'Categorias', 'Sobre', 'Contato']
    const options = wrapper.findAll('button').map((button) => {
      if (button.element.childElementCount === 0) {
        return button.text()
      }
      return button.element.firstChild.textContent
    })

    expect(options).toEqual(expect.arrayContaining(expectedOptions))
  })
  test('current nav option gets gray bg', () => {
    expect(wrapper.find('#home').classes()).toContain('bg-light-gray')
  })
})