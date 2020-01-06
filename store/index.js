export const actions = {
  async register(_, params) {
    const data = await this.$axios.$post('/api/register', params)
    console.log(data)
    console.log('register')
  },
  async login(_, params) {
    const data = await this.$axios.$post('/api/login', params)
    console.log(data)
    console.log('login')
  }
}