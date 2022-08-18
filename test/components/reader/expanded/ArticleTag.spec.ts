import ArticleTag from '../../../../components/reader/expanded/ArticleTag.vue'
import { shallowMount } from '@vue/test-utils';

describe('ArticleTag', () => {
  test('renders tag', () => {
    const wrapper = shallowMount(ArticleTag, {
      props: {
        tagName: 'Economia'
      }
    });
    expect(wrapper.text()).toBe('Economia')
  });
});