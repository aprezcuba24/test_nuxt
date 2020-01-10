export const state = () => ({
  accessToken: '',
  user: {}
})

export const mutations = {
  setUser(state, data) {
    state.accessToken = data.accessToken
    state.user = data.user
    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
  },
  clearUser(state) {
    state.accessToken = ''
    state.user = {}
  }
}

export const actions = {
  async register({ commit }, params) {
    const data = await this.$axios.$post('/api/register', params)
    commit('setUser', data)
  },
  async login({ commit }, params) {
    const data = await this.$axios.$post('/api/login', params)
    commit('setUser', data)
  }
}