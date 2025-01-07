<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 justify-items-center">
    <PersonComponent v-for="person in persons" :key="person.name" :person="person" />
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const persons = [
  { name: 'Katherine Zeng', blurb: null, image: null },
  { name: 'Tina Guo', blurb: null, image: null },
  { name: 'Richard Masak', blurb: null, image: null },
  { name: 'Yifan Zhang', blurb: null, image: null }
]
</script>

<style scoped></style>
