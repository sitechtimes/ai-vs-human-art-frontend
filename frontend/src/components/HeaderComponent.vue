<template>
  <div>
    <Menubar id="header" :model="items" class="!rounded-none !absolute w-full top-0 z-40">
      <template #start>
        <img src="/fatfatpankocat-panko.gif" alt="placeholder logo" class="mr-0" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <!--         <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
           put something here to indicate that this is a dropdown i don't know
        </a> -->
      </template>
      <template #end>
        <div class="flex items-center gap-0.5" v-if="userStore.currentUser">
          <router-link to="/profile">
            <img
              :src="userStore.profile_picture || '/userImg.svg'"
              alt="placeholder avatar"
              class="rounded-full dark:invert"
            />
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
const signedIn = computed(() => !!userStore.currentUser)

const menuItems = ref([
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
    route: '/submit',
    label: 'Submit Your Art'
  },
  {
    route: false,
    label: 'About',
    items: [
      {
        route: '/team',
        label: 'The Team'
      },
      // {
      //   route: '/submit',
      //   label: 'Submit Your Art'
      // }, //make this into its own button
      {
        route: '/credits',
        label: 'Acknowledgements'
      }
    ]
  }
])

const items = computed(() => {
  const itemsValue = [...menuItems.value]
  if (!signedIn.value)
    itemsValue.push({
      route: '/sign',
      label: 'Sign In'
    })
  return itemsValue
})
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
