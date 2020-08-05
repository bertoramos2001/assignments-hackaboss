import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/landing',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/registrofamilia',
    name: 'RegistroFamilia',
    component: () => import('../views/RegistroFamilia.vue')
  },
  {
    path: '/registroojeador',
    name: 'RegistroOjeador',
    component: () => import('../views/RegistroOjeador.vue')
  },
  {
    path: '/loginfamilia',
    name: 'LoginFamilia',
    component: () => import('../views/LoginFamilia.vue')
  },
  {
    path: '/loginojeador',
    name: 'LoginOjeador',
    component: () => import('../views/LoginOjeador.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
