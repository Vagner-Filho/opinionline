import { mount } from "@vue/test-utils";
import ReaderNavBar from "../../components/reader/NavBar.vue";

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => { return { name: 'index' } }),
  computed: jest.fn()
}))

describe('Reader navigation bar', () => {
  const wrapper = mount(ReaderNavBar, {
    global: {
      stubs: ['NuxtLink']
    }
  })
  test('renders navigation options', () => {
    // const expectedOptions = ['Início', 'Categorias', 'Sobre', 'Contato']
    // const options = wrapper.findAll('button').map((button) => {
    //   if (button.text() in expectedOptions) {
    //     return button.text()
    //   }
    // })
    // expect(options).toEqual(expect.arrayContaining(expectedOptions))
    
    const opt = wrapper.find('#categories')
    expect(opt.text()).toBe('Categorias')
  })
  test('opens category drop down', () => {})
  test('redirect user on click', () => {})
  test('current nav option gets gray bg', () => {})
})