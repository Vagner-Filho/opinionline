import { describe, expect, test } from 'vitest';
import ArticleInfo from '../../../../components/reader/expanded/ArticleInfo.vue';
import ArticleTag from '../../../../components/reader/expanded/ArticleTag.vue';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

describe('ArticleInfo', () => {
    const titleMock = faker.lorem.words()
    const mockTags = faker.helpers.multiple(faker.lorem.word);
    const releaseDateMock = faker.date.past();
    const authorPic = faker.image.avatar();

    const wrapper = mount(ArticleInfo, {
        mocks: {
            ArticleTag: ArticleTag
        },
        props: {
            title: titleMock,
            tags: mockTags,
            releaseDate: releaseDateMock,
            authorPic: authorPic,
        }
    })
    test('renders title', () => {
        expect(wrapper.find('h1').text()).toBe(titleMock);
    });
    test('renders release date', () => {
        expect(wrapper.find('time').text()).toBe(getUserReadableDate(releaseDateMock));
    })
    test('renders author pic', () => {
        expect(wrapper.find('img').attributes('src')).toBe(authorPic);
    })
});
