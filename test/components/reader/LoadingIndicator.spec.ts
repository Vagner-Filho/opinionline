import LoadingIndicator from '../../../components/LoadingIndicator.vue'
import { shallowMount } from '@vue/test-utils'

describe('Loading Indicator', () => {
  test('shows indicator', () => {
    const wrapper = shallowMount(LoadingIndicator, {
      props: {
        isLoading: true,
        loadingIndicatorId: 'loading-indicator-1'
      }
    })
    expect(wrapper.find('.loading-indicator')).toBeTruthy()
  })
  test('shows default delay message after 5 seconds', () => {
    const wrapper = shallowMount(LoadingIndicator, {
      props: {
        isLoading: true,
        loadingIndicatorId: 'loading-indicator-1'
      }
    })
    setTimeout(() => {
      expect(wrapper.find('mark').text()).toBe('Demora inesperada. Por favor, aguarde...')
    }, 5000);
  })
  test('shows arbitrary delay message after 5 seconds', async () => {
    const wrapper = shallowMount(LoadingIndicator, {
      props: {
        isLoading: true,
        loadingIndicatorId: 'loading-indicator-1',
        loadingMessage: 'Por favor, aguarde mais um pouco :)'
      }
    })
    setTimeout(() => {
      expect(wrapper.find('mark').text()).toBe('Por favor, aguarde mais um pouco :)')
    }, 5000);
  })
})