import SettingUp from '../components/SettingUp.vue'
import { mount } from '@vue/test-utils'

describe('setup', () => {
  test('renders name prop', () => {
    const wrapper = mount(SettingUp, {
      props: {
        name: 'Olá amigo'
      }
    })
  
    expect(wrapper.props('name')).toEqual('Olá amigo')
  })
})