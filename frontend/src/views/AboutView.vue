<template>
  <div class="mt-[58px]">
    <div class="grid grid-cols-1 lg:grid-cols-2 justify-items-center">
      <PersonComponent v-for="person in persons" :key="person.name" :person="person" />
    </div>
  </div>
</template>

<script setup>
import PersonComponent from '../components/PersonComponent.vue'

const persons = [
  { name: 'Katherine Z', blurb: null, image: null },
  { name: 'Tina G', blurb: null, image: null },
  { name: 'Richard M', blurb: null, image: null },
  { name: 'Yifan Z', blurb: null, image: null }
]
</script>

<style scoped></style>
