import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
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
      path: '/user/:id',
      name: '',
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
      component: () => import('../views/SignFormView.vue')
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
      name: 'logout'
    }
    /* beforeEnter: async (to, from) => {
        await userStore.logout
        return { name: 'home' }
      } */
  ]
})

export default router
