import Sidebar from '../../../components/author/Sidebar.vue';
import { shallowMount } from '@vue/test-utils';

const push = jest.fn((routerObj) => {
  return routerObj;
})

describe('SideBar', () => {
  const wrapper = shallowMount(Sidebar, {
    global: {
      mocks: {
        $router: {
          push
        }
      }
    }
  });
  test('renders nav options', () => {
    const navOptions = wrapper.findAll('img');
    const optionsPublicPath = ['/public/author/profile.svg', '/public/author/home.svg', '/public/author/plus.svg', '/public/author/open-book.svg']

    for (const opt in navOptions) {
      expect(navOptions[opt].attributes('src')).toBe(optionsPublicPath[opt])
    }
  })
  test('redirects to correct page', async() => {
    const classes = ['.profile', '.home', '.create', '.articles'];
    const expectedRouterObj = [
      { name: 'author-profile' },
      { name: 'author-home' },
      { name: 'author-article', query: { isNew: '1' } },
      {name: 'author-article', query: { isNew: '0' } }
    ]
    for (const rtr in expectedRouterObj) {
      await wrapper.find(classes[rtr]).trigger('click');
      expect(push).toHaveBeenCalledWith(expectedRouterObj[rtr]);
    }
  })
})