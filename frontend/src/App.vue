<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import ThemeComponent from './components/ThemeComponent.vue'
</script>

<template>
  <div>
    <HeaderComponent />
    <!--should probaby put this on the home page; in app for now can we move this later when katherine is done or smth-->
    <ThemeComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>
