<template>
  <div class="grid grid-rows-auto gap-4">
    <PersonComponent v-for="person in people" :person="person" :key="person" />
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const people = [
  {
    name: 'Katherine Zeng'
  },
  {
    name: 'Tina Guo'
  },
  {
    name: 'Richard Masak'
  },
  {
    name: 'Yifan Zhang'
  }
]
</script>

<style scoped></style>
