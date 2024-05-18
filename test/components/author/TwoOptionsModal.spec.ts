import { faker } from "@faker-js/faker";
import { mount } from "@vue/test-utils"
import { describe, expect, test } from "vitest"

describe.todo('TwoOptionsModal', () => {
    const wrapper = mount({});

    test('renders title when prop provided', async () => {
        expect(wrapper.find('header > #title').exists()).toBeFalsy();
        const titleMock = faker.lorem.words();
        await wrapper.setProps({
            title: titleMock
        })
        expect(wrapper.find('header > #title').exists()).toBeTruthy();
        expect(wrapper.find('header > #title').text()).toBe(titleMock);
    })
    test('renders second button text default', () => {
        expect(wrapper.find('#btn-2').text()).toBe('Cancelar');
    })
    test('renders second button text provided', async () => {
        const secondTextMock = faker.lorem.word();
        await wrapper.setProps({
            secondText: secondTextMock
        });
        expect(wrapper.find('#btn-2').text()).toBe(secondTextMock);
    })
    test('emits second option', async () => {
       expect(wrapper.emitted()).not.toHaveProperty('second-option');
       await wrapper.find('#btn-2').trigger('click');
       expect(wrapper.emitted()).toHaveProperty('second-option');
    })
    test('renders first button text default', () => {
        expect(wrapper.find('#btn-1').text()).toBe('Ok');
    })
    test('renders first button text provided', async () => {
        const firstTextMock = faker.lorem.word();
        await wrapper.setProps({
            secondText: firstTextMock
        });
        expect(wrapper.find('#btn-1').text()).toBe(firstTextMock);
    })
    test('emits first option', async () => { 
       expect(wrapper.emitted()).not.toHaveProperty('first-option');
       await wrapper.find('#btn-1').trigger('click');
       expect(wrapper.emitted()).toHaveProperty('first-option');
    })
})
