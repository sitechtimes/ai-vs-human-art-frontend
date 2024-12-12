<template>
  <div>
    <div class="w-full flex flex-col gap-2 items-center pt-5"></div>
    <p>You've been signed out.</p>
    <div class="pt-2">
      <Button as="router-link" label="Go Home" to="/" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Button from 'primevue/button'

import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const signout = async () => {
  await userStore.logout()
}

onMounted(() => {
  signout()
})
</script>

<style scoped></style>
