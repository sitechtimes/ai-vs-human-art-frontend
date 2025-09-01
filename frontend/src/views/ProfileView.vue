<template>
  <div v-if="userExists">
    <div class="grid grid-flow-row auto-rows-max place-items-center gap-y-4">
      <div class="flex justify-center items-center">
        <img :src="user.profile_picture" alt="placeholder avatar" class="rounded-full h-36 m-3" />
        <Button>Change Photo</Button>
      </div>
      <div class="flex-col space-y-2.5 w-96 place-items-center place-self-center">
        <div>
          <Fieldset legend="Username" class="w-96">
            <p>{{ user.username }}</p>
          </Fieldset>
        </div>
        <div>
          <Fieldset legend="Email" class="w-96">
            <p>{{ user.email }}</p>
          </Fieldset>
        </div>
        <div>
          <Fieldset legend="High Score" class="w-96">
            <p>Your highest score was {{ user.highScore }}!</p>
          </Fieldset>
        </div>
      </div>
      <div class="mt-1">
        <Button aria-label="Logout" @click="logout">Log Out</Button>
      </div>
    </div>
  </div>
  <div v-else>
    <Message severity="error">
      You are not
      <RouterLink to="/sign" class="underline">logged in</RouterLink>
    </Message>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { ref, watchEffect } from 'vue'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import Message from 'primevue/message'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const highScore = ref(0)
const user = ref(null)
const userExists = ref(false)

const logout = async () => {
  await userStore.logout()
  router.push({ path: '/' })
}

watchEffect(() => {
  if (userStore.currentUser) {
    user.value = userStore.currentUser
    userExists.value = true
  } else {
    userExists.value = false // user still doesn't exist... but let it load
  }
})
</script>

<style scoped></style>
