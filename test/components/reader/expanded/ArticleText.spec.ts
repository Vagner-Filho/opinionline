import ArticleText from '../../../../components/reader/expanded/ArticleText.vue';
import { shallowMount } from '@vue/test-utils';

describe('Expanded Article Text', () => {
  const wrapper = shallowMount(ArticleText, {
    props: {
      articleText: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.'
    }
  });
  test('renders text', () => {
    expect(wrapper.find('article').text()).toBe('In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.')
  });
});