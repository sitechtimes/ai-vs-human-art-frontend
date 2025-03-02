<template>
  <div v-if="user">
    <h1 class="my-2 text-center text-2xl font-bold mt-6 underline">Profile Information</h1>
    <div class="flex flex-col space-y-2.5 mt-8 w-full space-y-8 items-center place-content-center">
      <div>
        <Fieldset legend="Username" class="w-80">
          <p>{{ user.username }}</p>
        </Fieldset>
      </div>
      <div>
        <Fieldset legend="Email" class="w-80">
          <p>{{ user.email }}</p>
        </Fieldset>
      </div>
      <Button @click="logout" class="w-80" aria-label="Log Out">Log Out</Button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const user = userStore.currentUser

const logout = () => {
  userStore.logout()
  router.push({ path: '/' })
}
</script>

<style scoped></style>
