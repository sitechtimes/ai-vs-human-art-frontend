<template>
  <!-- must add v-if for missing user -->
  <div v-if="FoundUserData.value">
    <div
      class="flex flex-row bg-primary-50 dark:bg-primary-950 p-7 m-7 rounded-md border border-primary-700 dark:border-primary-500"
    >
      <img
        :src="FoundUserData['profile_picture']"
        alt="placeholder avatar"
        class="clip-circle w-1/2 h-1/2"
      />
      <div class="flex flex-col justify-center p-5">
        <h3 class="text-3xl">{{ FoundUserData['username'] }}</h3>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col justify-center p-5">
      <h3 class="text-3xl">No User Found</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, onBeforeMount } from 'vue'
import Avatar from 'primevue/avatar'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
const FoundUserData = ref<any>([])
try {
  const res = userStore
    .getUser(Number(route.params.id))
    .then((data) => (FoundUserData.value = data))
} catch (error) {
  console.error(error)
}
</script>

<style scoped></style>
