<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import ThemeComponent from './components/ThemeComponent.vue'
// this janky piece of code's entire purpose is to supply the profile picture and sign in status to HeaderComponent
</script>
<template>
  <div>
    <HeaderComponent />
    <!--should probaby put this on the home page; in app for now can we move this later when katherine is done or smth-->
    <ThemeComponent />
    <RouterView />
  </div>
</template>
