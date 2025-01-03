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
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/egg',
      name: 'egg',
      component: () => import('../views/EasterEggView.vue')
    },
    {
      path: '/team',
      name: 'The Team',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/sign',
      name: 'signupsignin',
      component: () => import('../views/SignFormView.vue')
    },
    {
      path: '/about',
      name: 'aboutus',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('../views/SubmitArtView.vue')
    },
    {
      path: '/profile',
      name: 'profilepage',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

export default router
