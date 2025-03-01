<template>
  <div>
    <Menubar id="header" :model="items" class="!rounded-none">
      <template #start>
        <img src="/nagi.jpg" alt="placeholder logo" class="mr-0" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" :to="item.route">
          {{ item.label }}
        </router-link>
        <ul v-if="item.items">
          {{
            item.label
          }}
          <li v-for="entry in item.items" :key="entry.label">
            <router-link :to="{ path: entry.route, replace: true }" class="dropdown-item">
            </router-link>
          </li>
        </ul>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5">
          <router-link :to="'/user/${userData.userid}'">
            <img
              v-if="signedIn"
              :src="userData.profile_picture"
              class="rounded-full cursor-pointer"
            />
          </router-link>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const userData = inject('userData')
const router = useRouter()
const signedIn = computed(() => !!userData)

const items = ref([
  {
    route: '/',
    label: 'Home'
  },
  {
    route: '/game',
    label: 'Game'
  },
  {
    route: false,
    label: 'About Us',
    items: [
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
    ]
  },
  {
    route: signedIn.value ? false : '/sign',
    label: signedIn.value ? `User Settings` : 'Sign in', // I can't seem to access UserData in script setup, so the much easier option is to just call this user options
    items: signedIn.value
      ? [
          {
            route: '/logout',
            label: 'Log Out'
          }
        ]
      : null
  }
])
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
