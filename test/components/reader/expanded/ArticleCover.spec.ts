import ArticleCover from '../../../../components/reader/expanded/ArticleCover.vue';
import { shallowMount } from '@vue/test-utils';

describe('ArticleCover', () => {
  const wrapper = shallowMount(ArticleCover, {
    props: {
      coverPath: 'cover path',
      defaultCoverPath: 'default public cover path',
      articleTitle: 'Test Title'
    }
  })
  test('renders cover', () => {
    expect(wrapper.find('img').attributes('src')).toBe('cover path')
  });
  test('renders default cover', async () => {
    await wrapper.setProps({ coverPath: null })
    expect(wrapper.find('img').attributes('src')).toBe('default public cover path')
  }) 
  test('renders title', () => {
    expect(wrapper.find('img').attributes('alt')).toBe('capa do artigo: Test Title')
  })
});