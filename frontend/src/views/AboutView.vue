<template>
  <div class="grid grid-cols-2 grid-rows-2 justify-items-center m-7">
    <PersonComponent v-for="people in persons" :key="people" :person="people" />
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const persons = [
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
