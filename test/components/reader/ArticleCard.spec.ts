import ArticleCard from '../../../components/reader/ArticleCard.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

describe('ArticleCard', () => {
    const titleMock = faker.lorem.sentence();
    const coverMock = faker.image.url();
    const authorPicMock = faker.image.avatar();
    const textMock = faker.lorem.sentences();
    const releaseDateMock = faker.date.past().getTime();

    const wrapper = mount(ArticleCard, {
        props: {
            title: titleMock,
            cover: coverMock,
            text: textMock,
            authorPic: authorPicMock,
            releaseDate: releaseDateMock,
        }
    })
    it('renders cover', () => {
        expect(wrapper.find('header').find('img').attributes('src')).toBe(coverMock);
    })
    it('renders title', () => {
        expect(wrapper.find('h1').text()).toBe(titleMock);
    })
    it('renders text', () => {
        expect(wrapper.find('article').text()).toBe(textMock);
    })
    it('renders author picture', () => {
        expect(wrapper.find('#author-pic').attributes('src')).toBe(authorPicMock);
    })
    it('renders date', () => {
        const formattedMock = Intl.DateTimeFormat('pt-BR', {
            timeStyle: 'medium',
            dateStyle: 'long'
        }).format(releaseDateMock);
        expect(wrapper.find('time').text()).toBe(formattedMock);
    })
})
