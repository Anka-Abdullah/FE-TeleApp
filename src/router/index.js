import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresVisitor: true },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { requiresVisitor: true },
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
