<template>
  <div>
    <Menubar id="header" :model="items" class="!rounded-none">
      <template #start>
        <img src="/nagi.jpg" alt="placeholder logo" class="mr-0" />
      </template>
      <template #item="{ item, props }">
        <button v-if="item.route" @click="item.route">{{ item.label }}</button>
        <!-- <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link> -->
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span>{{ item.label }}</span>
          <!-- put something here to indicate that this is a dropdown i don't know -->
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5">
          <img
            v-if="signedIn"
            :src="userData.profile_picture"
            alt="placeholder avatar"
            class="rounded-full cursor-pointer"
            @click="router.push(`/user/${userData.userid}`), router.go(0)"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const router = useRouter()
const signedIn = computed(() => !!userData)
const userData = inject('userData')

/* const globalRouter = function (route: String) {
  router.push(`/${route}`)
  router.go(0)
} */
const items = ref([
  {
    route: function () {
      router.push('/')
    },
    label: 'Home'
  },
  {
    route: function () {
      router.push('/game')
    },
    label: 'Game'
  },
  {
    route: false,
    label: 'About Us',
    items: [
      {
        route: function () {
          router.push('/team')
        },
        label: 'The Team'
      },
      {
        route: function () {
          router.push('/submit')
        },
        label: 'Submit Your Art'
      },
      {
        route: function () {
          router.push('/credits')
        },
        label: 'Acknowledgements'
      }
    ]
  },
  {
    route: signedIn.value
      ? false
      : function () {
          router.push('/sign')
        },
    label: signedIn.value ? `User Settings` : 'Sign in', // I can't seem to access UserData in script setup, so the much easier option is to just call this user options
    items: !signedIn.value
      ? null
      : [
          {
            route: async function () {
              await userStore.logout().then(() => {
                router.push('/')
                router.go(0)
              })
            },
            label: 'Log Out'
          }
        ]
  }
])
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
