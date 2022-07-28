import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import stayDetails from '../views/stay-details.vue'
import explore from '../views/explore.vue'
import stayDashboard from '../views/dashboard.vue'
import wishlists from '../views/wishlists.vue'
import trips from '../views/trips.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/stay/details/:stayId',
      name: 'stay-details',
      component: stayDetails,
    },
    {
      path: '/stay/dashboard/',
      name: 'stay-dashboard',
      component: stayDashboard
    },
    {
      path: '/explore/:destination',
      name: 'explore',
      component: explore,
    },
    {
      path: '/trips',
      name: 'trips',
      component: trips,
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: wishlists,
    },
  ],
})

export default router
