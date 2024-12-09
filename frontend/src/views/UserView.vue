<template>
  <div>
    <UserComponent :data="data" :key="data" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserComponent from '../components/UserComponent.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const userData = ref()
onMounted(() => {
  try {
    const res = userStore.getUser(Number(route.params.id)).then((response) => response.json())
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
