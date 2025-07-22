<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import ThemeComponent from './components/ThemeComponent.vue'
const userStore = useUserStore()
onMounted(async () => {
  if (userStore.currentUser == null) {
    try {
      await userStore.refresh()
      console.log('User logged in via refresh token')
    } catch {
      console.log('No refresh token found, user not logged in')
    }
  }
})
</script>

<template>
  <div>
    <HeaderComponent />
    <ThemeComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>
