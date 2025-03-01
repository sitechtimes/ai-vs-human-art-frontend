<template>
  <div>
    <Menubar id="header" :model="items" class="!rounded-none">
      <template #start>
        <img src="/nagi.jpg" alt="placeholder logo" class="mr-0 w-[3rem] h-[3rem]" />
      </template>
      <template #item="{ item, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" @click="navigate" class="block w-full">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target">
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5">
          <router-link :to="userLink">
            <img
              v-if="signedIn"
              :src="userData?.profile_picture || '/defaultprofileimage.jpg'"
              class="rounded-full cursor-pointer w-[3rem] h-[3rem]"
            />
            <!-- fallback image = cloudinary default-->
          </router-link>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import { useUserStore } from '../stores/user'
const userData = ref()
const userStore = useUserStore()
const fetchUserData = async () => {
  if (userStore.userID) {
    const storeData = await userStore.getUser(Number(userStore.userID))
    userData.value = storeData
  }
}
onMounted(fetchUserData)
const signedIn = computed(() => !!userData.value)
const userLink = computed(() => {
  return userData.value ? `/user/${userData.value.userid}` : '#'
})
const items = computed(() => [
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
    label: signedIn.value ? `Welcome, ${userData?.value.username}` : 'Sign in', // I can't seem to access UserData in script setup, so the much easier option is to just call this user options
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

<style scoped></style>
