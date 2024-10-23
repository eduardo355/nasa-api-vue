import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/AsteroidView.vue'),
      props: true
    },
    {
      path: '/marsrovers',
      name: 'marsrovers',
      component: () => import('../views/MarsRoverView.vue')
    },
    {
      path: '/apod',
      name: 'apod',
      component: () => import('../views/ApodView.vue')
    },
    {
      path: '/earth',
      name: 'earth',
      component: () => import('../views/EarthView.vue')
    }
  ]
})

export default router
