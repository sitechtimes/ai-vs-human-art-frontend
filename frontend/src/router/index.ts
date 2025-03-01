import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/about',
      name: 'aboutus',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/egg',
      name: 'egg',
      component: () => import('../views/EasterEggView.vue')
    },
    {
      path: '/sign',
      name: 'signupsignin',
      component: () => import('../views/SignFormView.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ErrorView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        console.log('beforeEnter is running...')
        const userStore = useUserStore()
        try {
          await userStore.logout()
          next('/')
        } catch (error) {
          console.error('Logout failed:', error)
        }
      }
    }
  ]
})

export default router
