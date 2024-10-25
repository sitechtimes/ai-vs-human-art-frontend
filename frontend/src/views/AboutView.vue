<template>
  <div>
    <h1 class="text-5xl text-center pt-5">The Team</h1>
    <div class="flex flex-row flex-wrap"><PersonComponent /> <PersonComponent /></div>
  </div>
</template>

<script setup lang="ts">
import PersonComponent from '../components/PersonComponent.vue'
</script>

<style scoped></style>
