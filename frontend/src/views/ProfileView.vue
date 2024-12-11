<template>
  <div v-if="user">
    <div class="flex-col space-y-2.5 mt-6 w-96 place-items-center place-self-center">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'

const userStore = useUserStore()
const user = userStore.currentUser
const username = ref('')
const email = ref('')

const logout = () => userStore.logout()

function getData(user: { username: string; email: string }) {
  console.log(user)
  username.value = user.username
  email.value = user.email
}
if (user) {
  getData(user)
}
</script>

<style scoped></style>
