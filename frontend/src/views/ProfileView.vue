<template>
  <div class="mt-[58px]">
    <Message severity="error"
      >You are not
      <RouterLink to="/sign" class="underline">logged in</RouterLink>
    </Message>
    <div v-if="user">
      <div class="flex justify-center items-center">
        <img src="/nagi.jpg" alt="placeholder avatar" class="rounded-full h-36 m-3" />
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
      </div>
      <div class="mt-1">
        <Button @click="logout">Log Out</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import Message from 'primevue/message'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const user = userStore.currentUser
const username = ref('')
const email = ref('')
const router = useRouter()
const logout = () => {
  userStore.logout()
  router.push({ path: '/' })
}

function getData(user) {
  username.value = user.username
  email.value = user.email
}

if (user) {
  getData(user)
}
</script>

<style scoped></style>
