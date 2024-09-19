<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <img src="../assets/placholdrre.png" alt="placeholder logo" id="header-logo" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <img src="../assets/nagi.jpg" alt="placeholder avatar" id="header-avatar" />
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
    route: '/sign-in',
    label: 'Sign In'
  }
])
</script>

<style>
.p-menubar-root-list {
  margin: 0 0 0 auto !important;
}
#header-logo {
  width: 40px;
  height: 40px;
}
.p-menubar-end {
  margin: 0 !important;
}
#header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
