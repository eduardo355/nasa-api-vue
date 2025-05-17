import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/asteroid/:id',
      name: 'asteroid',
      component: () => import('../views/asteroid-view.vue'),
      props: true
    },
    {
      path: '/apod',
      name: 'apod',
      component: () => import('../views/apod-view.vue')
    },
    {
      path: '/marsrovers',
      name: 'marsrovers',
      component: () => import('../views/mars-rover-view.vue')
    }
  ]
})

export default router
