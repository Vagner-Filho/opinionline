import NewTagModal from '../../../components/author/NewTagModal.vue'
import { ref } from 'vue'
import { shallowMount } from '@vue/test-utils';

describe('NewTag', () => {
  const alert = jest.fn()
  const wrapper = shallowMount(NewTagModal, {
    global: {
      mocks: {
        ref: ref,
        alert
      }
    },
    props: {
      isVisible: true
    }
  })
  test('validate tag name', async () => {
    wrapper.find('input').setValue('')
    await wrapper.find('button').trigger('click')
    expect(alert).toHaveBeenCalled()
  })
  test('emit inputed tag name', async () => {
    wrapper.find('input').setValue('tag name')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('tag')
    expect(wrapper.emitted()[0][0]).toBe('tag name')
  })
  test('emit destroy to hide self', async () => {
    await wrapper.find('#modal-panel').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('destroy')
  })
})