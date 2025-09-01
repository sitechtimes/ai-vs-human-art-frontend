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
    } catch (error) {
      console.log('User not logged in via refresh token', error)
    }
  }
})
</script>

<template>
  <div>
    <HeaderComponent />
    <ThemeComponent />
    <RouterView />
    <ThemeComponent/>
  </div>
</template>

<style scoped></style>
