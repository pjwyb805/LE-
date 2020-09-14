import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('../views/Classify.vue')
      }, {
        path: '/carts',
        name: 'carts',
        component: () => import('../views/Carts.vue')
      }, {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue')
      }
    ]
  }, {
    path: '/details',
    name: 'details',
    component: () => import('../views/Details.vue')
  }, {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/Loading.vue')
  }, {
    path: '/order',
    name: 'order',
    component: () => import('../views/Order.vue')
  }, {
    path: '/address',
    name: 'address',
    component: () => import('../views/Address.vue')
  },{
    path: '/payment',
    name: 'payment',
    component: () => import('../views/Payment.vue')
  },{
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

