const contacts = {
  state: {
    contacts: []
  },
  getters: {},
  mutations: {
    setContacts(state, val) {
      state.contacts = val
    }
  },
  actions: {
    async getContacts({ commit, dispatch }) {
      const url = 'contacts'
      const res = await dispatch('request', {
        url,
        method: 'GET'
      })

      if (res) {
        commit('setContacts', res.data)
      }
    },
    async getContact({ dispatch }, id) {
      const url = `contacts/${id}`
      const res = await dispatch('request', {
        url,
        method: 'GET'
      })

      return res
    },
    async editContact({ dispatch }, payload) {
      const url = `contacts/${payload.id}`
      const res = await dispatch('request', {
        url,
        method: 'PUT',
        payload
      })

      return res
    },
    async removeContact({ dispatch }, id) {
      const url = `contacts/${id}`
      const res = await dispatch('request', {
        method: 'DELETE',
        url
      })

      return res
    }
  }
}

export default contacts
