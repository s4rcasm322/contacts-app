const auth = {
  state: {
  },
  getters: {},
  mutations: {
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

            window.localStorage.setItem('hash', hash)

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
    logout() {
      window.localStorage.removeItem('hash')
    }
  }
}

export default auth
