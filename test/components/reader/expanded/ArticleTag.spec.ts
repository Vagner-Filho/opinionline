import { describe, expect, test } from 'vitest';
import ArticleTag from '../../../../components/reader/expanded/ArticleTag.vue'
import { shallowMount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

describe('ArticleTag', () => {
    const tagNameMock = faker.lorem.word();
    test('renders tag', () => {
        const wrapper = shallowMount(ArticleTag, {
            props: {
                tagName: tagNameMock
            }
        });
        expect(wrapper.text()).toBe(tagNameMock);
    });
});
