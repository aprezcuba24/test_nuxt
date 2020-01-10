import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import LoginForm from '@/pages/login'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login form', () => {
  it('calls the login action correctly', () => {
    const loginMock = jest.fn(() => Promise.resolve())
    const store = new Vuex.Store({
      actions: {
        login: loginMock
      }
    })
    const wrapper = mount(LoginForm, {
      localVue,
      store,
      mocks: {
        $t: key => key
      },
      stubs: {
        NuxtLink: true
      }
    })
    wrapper.find('form').trigger('submit')
    expect(loginMock).not.toHaveBeenCalled()

    wrapper.setData({
      form: {
        email: 'admin@gmail.com',
        password: 'aa'
      } })

    wrapper.find('form').trigger('submit')
    expect(loginMock).toHaveBeenCalled()
  })
})
