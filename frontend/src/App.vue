<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import ThemeComponent from './components/ThemeComponent.vue'
</script>

<template>
  <div>
    <HeaderComponent />
    <RouterView />
    <ThemeComponent/>
  </div>
</template>

<style scoped></style>
