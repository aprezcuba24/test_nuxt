export const actions = {
  async register(_, params) {
    const data = await this.$axios.$post('/api/register', params)
    console.log(data)
    console.log('login')
  }
}