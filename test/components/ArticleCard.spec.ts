import ArticleCard from '../../components/reader/ArticleCard.vue';
import { useRouter } from 'vue-router';
import { shallowMount } from '@vue/test-utils';

describe('ArticleCard', () => {
  const wrapper = shallowMount(ArticleCard, {
    props: {
      article: {
        title: 'test title',
        cover: 'cover path',
        authorPic: 'pic path',
        preview: 'article preview',
        releaseDate: '20/08/1999',
        id: 13
      }
    },
    global: {
      mocks: {
        $router: useRouter()
      }
    }
  })
  test('renders cover', () => {
    expect(wrapper.find('header').find('img').attributes('src')).toEqual('cover path');
  })
  test('renders title', () => {
    expect(wrapper.find('h1').text()).toEqual('test title');
  })
  test('renders author picture', () => {
    expect(wrapper.find('#author-pic').attributes('src')).toEqual('pic path');
  })
  test('renders date', () => {
    expect(wrapper.find('time').text()).toEqual('20/08/1999');
  })
  test('renders preview', () => {
    expect(wrapper.find('article').text()).toEqual('article preview');
  })
  test('emits article id on click', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted().articleClicked[0][0]).toEqual(13);
  })
})