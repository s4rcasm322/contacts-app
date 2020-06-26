const auth = {
  state: {
    isAuthorized: false,
    hash: null
  },
  getters: {},
  mutations: {
    setIsAuthorized(state, val) {
      state.isAuthorized = val
    },
    setHash(state, val) {
      state.hash = val
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      const url = 'users'
      const res = await dispatch('request', { method: 'GET', url })
      if (res) {
        let hash = ''

        for (const user of res.data) {
          if (
            user.username == payload.username &&
            user.password == payload.password
          ) {
            hash = Math.random()
              .toString(36)
              .substring(2)

            commit('setHash', hash)
            window.localStorage.setItem('hash', hash)
            commit('setIsAuthorized', true)

            break
          }
        }

        if (hash) {
          res.hash = hash
        } else {
          res.message = 'Неверное имя пользователя или пароль!'
        }

        return res
      }
    },
    async registration({ dispatch }, payload) {
      const url = 'users'
      const res = await dispatch('request', { method: 'GET', url })

      if (res) {
        for (const user of res.data) {
          if (
            user.username == payload.username &&
            user.password == payload.password
          ) {
            res.message = 'Такой пользователь уже зарегестирован!'

            return res
          }
        }
      }

      await dispatch('request', { method: 'POST', url, payload })

      return await dispatch('login', payload)
    },
    autoLogin({ commit }) {
      const hash = window.localStorage.getItem('hash')

      if (hash) {
        commit('setHash', hash)
        commit('setIsAuthorized', true)
      }
    },
    logout({ commit }) {
      window.localStorage.removeItem('hash')
      commit('setHash', null)
      commit('setIsAuthorized', false)
    }
  }
}

export default auth
