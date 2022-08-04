import HomeStateIndicator from '../../components/reader/HomeStateIndicator.vue';
import { shallowMount } from '@vue/test-utils'; 

describe('Home Indicator', () => {
  const wrapper = shallowMount(HomeStateIndicator);

  test('emits click event', async () => {
    await wrapper.find('span').trigger('click');  

    expect(wrapper.emitted().click).toBeTruthy();
  })
  test('emits click event with api route', async () => {
    await wrapper.find('span').trigger('click');

    expect(wrapper.emitted().click[0][0]).toEqual('mostRead');
    expect(wrapper.emitted().click[1][0]).toEqual('mostRecent');
  })
  test('text when in most recent', () => {
    expect(wrapper.find('span').text()).toEqual('Ver mais lidos')
  })
  test('text when in most read', async () => {
    await wrapper.find('span').trigger('click');  

    expect(wrapper.find('span').text()).toEqual('Ver mais recentes')
  })
})