import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import stayDetails from '../views/stay-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/stay/details/:stayId',
      name: 'stay-details',
      component: stayDetails
    },
  ]
})

export default router
