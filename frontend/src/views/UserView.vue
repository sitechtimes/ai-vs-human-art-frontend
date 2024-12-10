<template>
  <div>
    <div
      class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500"
    >
      <p>{{ userData }}</p>
      <img
        class="object-contain w-52 h-80 flex self-center"
        :src="userData['profile_picture']"
        :alt="userData['username']"
      />
      <div class="flex flex-col justify-center p-5">
        <h3 class="text-3xl">{{ userData['username'] }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const userData = ref([]) // vue iteraates through dict
onMounted(() => {
  try {
    const res = userStore
      .getUser(Number(route.params.id))
      .then((response) => response.json())
      .then((data) => (userData.value = data))
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
