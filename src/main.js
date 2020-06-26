import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import vueDebounce from 'vue-debounce'
import 'boxicons'
import 'normalize.css'

Vue.use(vueDebounce, {
  listenTo: ['input', 'change']
})
Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
