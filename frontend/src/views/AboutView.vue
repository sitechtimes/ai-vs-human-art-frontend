<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
    <PersonComponent v-for="person in persons" :key="person.name" :person="person" />
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const persons = [
  { name: 'Katherine Zeng', blurb: null },
  { name: 'Tina Guo', blurb: null },
  { name: 'Richard Masak', blurb: null },
  { name: 'Yifan Zhang', blurb: null }
]
</script>

<style scoped></style>
