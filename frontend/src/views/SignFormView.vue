<template>
  <div>
    <div class="text-center">
      <h1 v-if="SignUp">Sign Up</h1>
      <h1 v-if="!SignUp">Sign In</h1>
    </div>
    <div>
      <form action="submit">
        <div v-if="SignUp">
          <InputText id="username" v-model="usernameValue" placeholder="Username" />
          <InputText id="email" v-model="emailValue" placeholder="Email" />
        </div>
        <div v-if="!SignUp">
          <InputText id="username" v-model="usernameValue" placeholder="Username/Email" />
        </div>
        <Password
          v-model="passwordValue"
          id="password"
          :feedback="false"
          toggleMask
          placeholder="Password"
        />
        <div class="card flex justify-center">
          <Button label="Submit" @click="signIn" />
        </div>
      </form>
    </div>
    <div>
      <Button v-if="SignUp" label="Sign In" link @click="toggleSignView" />
      <Button v-if="!SignUp" label="Sign Up" link @click="toggleSignView" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const SignUp = ref(false)
const usernameValue = ref(null)
const emailValue = ref(null)
const passwordValue = ref(null)

const userStore = useUserStore()

function toggleSignView() {
  SignUp.value = !SignUp.value
}
async function registerInfo() {
  await userStore.register(usernameValue.value, emailValue.value, passwordValue.value)
  console.log('ur registered!')
}

async function signIn() {
  await userStore.login(usernameValue.value, passwordValue.value)
  console.log('u signed in!')
}
</script>

<style scoped></style>
