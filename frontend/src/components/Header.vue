<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <!-- logo should be here -->
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
      <template #end>
        <div>
          <!-- user profile -->
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  {
    route: '/',
    label: 'Home',
    icon: 'pi pi-home',
    hasSubmenu: false
  },
  {
    route: '/game',
    label: 'Game',
    hasSubmenu: false
  },
  {
    route: false,
    label: 'About Us',
    items: [
      {
        route: '/team',
        label: 'The Team',
        hasSubmenu: false
      },
      {
        route: '/submit',
        label: 'Submit Your Art',
        hasSubmenu: false
      },
      {
        route: '/credits',
        label: 'Acknowledgements',
        hasSubmenu: false
      }
    ]
  },
  {
    route: '/sign-in',
    label: 'Sign In',
    hasSubmenu: false
  }
])
</script>

<style></style>
