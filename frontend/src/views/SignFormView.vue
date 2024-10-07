<template>
  <div>
    <div class="text-center mt-10">
      <h1 v-if="SignUp" class="m-2">Sign Up</h1>
      <h1 v-if="!SignUp" class="m-2">Sign In</h1>
    </div>
    <div class="flex justify-center">
      <form action="submit">
        <div v-if="SignUp" class="flex flex-col">
          <InputText v-model="usernameValue" placeholder="Username" class="m-2" />
          <InputText v-model="emailValue" placeholder="Email" class="m-2" />
        </div>
        <div v-if="!SignUp">
          <InputText
            id="username"
            v-model="usernameValue"
            placeholder="Username/Email"
            class="m-2 !pr-10"
          />
        </div>
        <Password
          v-model="passwordValue"
          id="password"
          :feedback="false"
          toggleMask
          placeholder="Password"
          class="m-2"
        />
        <div class="card flex justify-center">
          <Button label="Sign In" @click="signIn" v-if="SignUp" class="m-2" />
          <Button label="Sign Up" @click="registerInfo" v-if="!SignUp" class="m-2" />
        </div>
      </form>
    </div>
    <div class="flex justify-center">
      <Button v-if="SignUp" label="Switch to Sign In" link @click="toggleSignView" class="m-2" />
      <Button v-if="!SignUp" label="Switch to Sign Up" link @click="toggleSignView" class="m-2" />
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
