<template>
  <div>
    <Menubar id="header" :model="items">
      <template #start>
        <img src="/fatfatpankocat-panko.gif" alt="placeholder logo" id="header-logo" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
          <!-- put something here to indicate that this is a dropdown i don't know -->
        </a>
      </template>
      <template #end>
        <div id="header-avatar">
          <img src="/nagi.jpg" alt="placeholder avatar" />
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

<style scoped>
img {
  width: 40px;
  height: 40px;
}

#header-logo {
  margin-right: 1rem;
}

#header-avatar {
  display: flex;
  align-items: center;
  gap: 2px;
}

#header-avatar img {
  border-radius: 50%;
}

.p-menubar-root-list {
  margin: 0 0 0 auto !important;
}
</style>
