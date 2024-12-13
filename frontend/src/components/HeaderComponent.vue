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
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span>{{ item.label }}</span>
          <!-- put something here to indicate that this is a dropdown i don't know -->
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-0.5">
          <img v-if="signedIn" src="/nagi.jpg" alt="placeholder avatar" class="rounded-full" />
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
let signedIn = computed(() => !!userStore.currentUser)

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
  }
])

const SignButton = () => {
  console.log('in')
  return {
    route: '/sign',
    label: 'Sign In'
  }
}

const items = computed(() => {
  const itemsValue = [...menuItems.value]
  if (!signedIn.value) {
    itemsValue.push(SignButton())
  }
  return itemsValue
})
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
}
</style>
