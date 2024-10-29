<template>
  <div class="grid grid-cols-2 grid-rows-2 justify-items-center m-7">
    <PersonComponent v-for="person in persons" :key="person" :person="person" />
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const persons = [
  { name: 'Katherine Zeng', blurb: '' },
  { name: 'Tina Guo', blurb: '' },
  { name: 'Richard Masak', blurb: '' },
  { name: 'Yifan Zhang', blurb: '' }
]
</script>

<style scoped></style>
