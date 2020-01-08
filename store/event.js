const endpoint = '/api/event'

export const actions = {
  list() {
    return this.$axios.$get(endpoint)
  },
  create(_, params) {
    return this.$axios.$post(endpoint, params)
  },
  remove(_, { _id }) {
    return this.$axios.$delete(`${endpoint}/${_id}`)
  },
  get(_, { _id }) {
    return this.$axios.$get(`${endpoint}/${_id}`)
  },
  update(_, params) {
    return this.$axios.$put(`${endpoint}/${params._id}`, params)
  },
}
