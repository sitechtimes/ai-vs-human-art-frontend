<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
    <PersonComponent v-for="person in persons" :key="person.name" :person="person" />
  </div>
</template>

<script setup lang="ts">
import PersonComponent from '../components/PersonComponent.vue'

const persons: { name: string; blurb: string | null; image: string | null } = [
  { name: 'Katherine Zeng', blurb: null, image: null },
  { name: 'Tina Guo', blurb: null, image: null },
  {
    name: 'Richard Masak',
    blurb: null,
    image: 'https://primefaces.org/cdn/primevue/images/organization/walter.jpg'
  },
  { name: 'Yifan Zhang', blurb: null, image: null }
]
</script>

<style scoped></style>
