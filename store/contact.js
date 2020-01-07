export const actions = {
  list() {
    return this.$axios.$get('/api/contact')
  },
  create(_, params) {
    return this.$axios.$post('/api/contact', params)
  },
  remove(_, { _id }) {
    return this.$axios.$delete(`/api/contact/${_id}`)
  },
  get(_, { _id }) {
    return this.$axios.$get(`/api/contact/${_id}`)
  },
  update(_, params) {
    return this.$axios.$put(`/api/contact/${params._id}`, params)
  },
}