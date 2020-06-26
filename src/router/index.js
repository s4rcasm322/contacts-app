import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Contacts',
        component: () => import('../views/Contacts.vue')
      },
      {
        path: '/contact/:id',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('../layouts/FullLayout.vue'),
    children: [
      {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue')
      },
      {
        path: '/registration',
        name: 'Registration',
        component: () => import('../views/Registration.vue')
      },
      {
        path: '(.*)',
        name: '404',
        component: () => import('../views/404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let hash = localStorage.getItem('hash')

  if (to.path !== '/auth' && to.path !== '/registration') {
    if (!hash) {
      return next('/auth')
    } else {
      return next()
    }
  } else if (to.path === '/auth' || to.path === '/registration') {
    if (hash) {
      return next('/')
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
