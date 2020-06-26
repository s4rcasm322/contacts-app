import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import auth from './modules/auth'
import contacts from './modules/contacts'

export default new Vuex.Store({
  actions: {
    request(context, { method, url, payload = {} }) {
      return axios({
        method,
        url: `http://localhost:8008/${url}`,
        data: JSON.parse(JSON.stringify(payload))
      })
        .then(response => {
          const { status, statusText, data } = response
          return { status, message: statusText, data }
        })
        .catch(err => {
          if (err) {
            console.error(err)
          }
        })
    }
  },
  modules: {
    contacts,
    auth
  }
})
