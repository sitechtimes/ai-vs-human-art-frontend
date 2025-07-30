<template>
  <div class="mt-20">
    <div v-if="user">
      <div class="grid grid-flow-row auto-rows-max place-items-center gap-y-4">
        <div class="flex justify-center items-center">
          <img :src="profile_picture" alt="placeholder avatar" class="rounded-full h-36 m-3" />
          <Button>Change Photo</Button>
        </div>
        <div class="flex-col space-y-2.5 w-96 place-items-center place-self-center">
          <div>
            <Fieldset legend="Username" class="w-96">
              <p>{{ username }}</p>
            </Fieldset>
          </div>
          <div>
            <Fieldset legend="Email" class="w-96">
              <p>{{ email }}</p>
            </Fieldset>
          </div>
          <div>
            <Fieldset legend="High Score" class="w-96">
              <p>Your highest score was {{ highScore }}!</p>
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
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { ref } from 'vue'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import Message from 'primevue/message'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const user = userStore.currentUser
const username = ref('')
const email = ref('')
const router = useRouter()
const profile_picture = ref('')
const highScore = ref(0)
const logout = async () => {
  await userStore.logout()
  router.go(0)
  router.push({ path: '/' })
}

function getData(user) {
  username.value = user.username
  email.value = user.email
  profile_picture.value = user.profile_picture
  highScore.value = user.highScore
}

if (user) {
  getData(user)
}
</script>

<style scoped></style>
