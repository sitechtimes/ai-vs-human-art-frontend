<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import ThemeComponent from './components/ThemeComponent.vue'
import { useUserStore } from './stores/user'
import { useRoute } from 'vue-router'
const route = useRoute()
const userStore = useUserStore()
const userData = ref([])
/* onMounted(() => { */
if (userStore.userID) {
  console.log(userStore.userID)
  try {
    const res = userStore.getUser(Number(userStore.userID)).then((data) => (userData.value = data))
    provide('userData', userData)
  } catch (error) {
    console.error(error)
  }
}
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
