import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', component: () => import('./components/AsyncTest.vue') },
  { path: '/keep', component: () => import('./components/keep-alive/WillKeep.vue') },
  { path: '/notkeep', component: () => import('./components/keep-alive/WillNotKeep.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router