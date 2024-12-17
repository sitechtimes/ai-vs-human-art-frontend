<template>
  <div>
    <Menubar id="header" :model="items" class="!rounded-none">
      <template #start>
        <img src="/fatfatpankocat-panko.gif" alt="placeholder logo" class="mr-0" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5" v-if="userStore.currentUser">
          <router-link to="/profile">
            <p>Profile</p>
          </router-link>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const user = userStore.currentUser
const signRoute = ref('/sign')
const signLabel = ref('Sign In')

if (user) {
  signRoute.value = '/profile'
  signLabel.value = 'Profile'
}

const items = ref([
  {
    route: '/',
    label: 'Home'
  },
  {
    route: '/game',
    label: 'Game'
  },
  // {
  //   route: '/about',
  //   label: 'About Us'
  // },
  {
    route: '/about',
    label: 'About Us'
    /*     items: [
      {
        route: '/team',
        label: 'The Team'
      },
      {
        route: '/submit',
        label: 'Submit Your Art'
      },
      {
        route: '/credits',
        label: 'Acknowledgements'
      }
    ] */
  },
  {
    route: signRoute.value,
    label: signLabel.value
  }
])
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
