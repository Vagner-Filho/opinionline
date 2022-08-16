import NewTagModal from '../../../components/author/NewTagModal.vue'
import { shallowMount } from '@vue/test-utils';

describe('NewTag', () => {
  const wrapper = shallowMount(NewTagModal, {
    props: {
      isVisible: true
    }
  })
  test('validate tag name', async () => {
    await wrapper.setData({ tagNameInput: null })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('invalid')
    expect(wrapper.emitted().invalid[0]).toEqual('Nome da tag inválido')
  })
  test('emit inputed tag name', async () => {
    await wrapper.setData({ tagNameInput: 'tag name' })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('tag')
    expect(wrapper.emitted()[0][0]).toBe('tag name')
  })
  test('emit destroy to hide self', async () => {
    await wrapper.find('#modal-back').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('destroy')
  })
})