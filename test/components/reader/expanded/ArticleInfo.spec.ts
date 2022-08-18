import ArticleInfo from '../../../../components/reader/expanded/ArticleInfo.vue';
import ArticleTag from '../../../../components/reader/expanded/ArticleTag.vue';
import { mount } from '@vue/test-utils';

describe('ArticleInfo', () => {
  const wrapper = mount(ArticleInfo, {
    mocks: {
      ArticleTag: ArticleTag
    },
    props: {
      title: 'Test Title',
      tags: ['Esporte', 'Economia'],
      releaseDate: '18/09/2019',
      authorPic: 'author pic path',
      defaulAuthorPic: 'default author pic public path',
    }
  })
  test('renders title', () => {
    expect(wrapper.find('h1').text()).toBe('Test Title')
  });
  test('renders tags', () => {
    const tags = wrapper.props('tags')
    for (const tag of tags) {
      expect(wrapper.find(`#${tag.toLocaleLowerCase()}-tag`).text()).toBe(tag)
    }
  })
  test('renders release date', () => {
    expect(wrapper.find('time').text()).toBe('18/09/2019')
  })
  test('renders author pic', () => {
    expect(wrapper.find('img').attributes('src')).toBe('author pic path')
  })
  test('renders default public author pic', async () => {
    await wrapper.setProps({
      authorPic: null
    })
    expect(wrapper.find('img').attributes('src')).toBe('default author pic public path')
  })
});