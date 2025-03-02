<template>
  <div>
    <Menubar id="header" :model="menuItems" class="!rounded-none !absolute w-full top-0 z-40">
      <template #start>
        <img src="/fatfatpankocat-panko.gif" alt="placeholder logo" class="mr-0" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <span :href="href" v-bind="props.action" @click="navigate">{{ item.label }}</span>
        </router-link>
        <router-link v-if="item.route == null" v-slot="{ href, navigate }" :to="'/sign'">
          <span :href="href" v-bind="props.action" @click="navigate">
            {{ signedIn ? null : 'Sign In' }}
          </span>
        </router-link>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5" v-if="userStore.currentUser">
          <router-link to="/profile">
            <img src="/userImg.svg" alt="placeholder avatar" class="rounded-full dark:invert" />
          </router-link>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Menubar from 'primevue/menubar'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const signedIn = computed(() => userStore.currentUser)

const menuItems = ref([
  {
    route: '/',
    label: 'Home'
  },
  {
    route: '/game',
    label: 'Game'
  },
  {
    route: '/submit',
    label: 'Submit Your Art'
  },
  {
    route: '/about',
    label: 'About',
    items: [
      {
        route: '/team',
        label: 'The Team'
      },
      {
        route: '/credits',
        label: 'Acknowledgements'
      }
    ]
  },
  {
    route: null,
    label: ''
  }
])
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
