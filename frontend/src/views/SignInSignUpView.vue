<template>
  <div>
    <div v-if="SignUp">
      <div id="pass-user-container">
        <h1 id="title">Sign Up</h1>
        <div class="card flex justify-center input">
          <FloatLabel>
            <label for="username">Username</label>
            <InputText id="username" v-model="usernameValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center input" id="email-input">
          <FloatLabel>
            <label for="email">Email</label>
            <InputText id="email" v-model="emailValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center input">
          <FloatLabel>
            <Password v-model="passwordValue" id="password" toggleMask />
            <label for="password">Password</label>
          </FloatLabel>
        </div>
        <div class="card flex justify-center">
          <Button label="Submit" @click="registerInfo" />
        </div>
      </div>
    </div>
    <div v-if="!SignUp">
      <div id="pass-user-container">
        <h1 id="title">Sign In</h1>
        <div class="card flex justify-center input" id="sign-in-username">
          <FloatLabel>
            <label for="username">Username/Email</label>
            <InputText id="username" v-model="usernameValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center input">
          <FloatLabel>
            <Password v-model="passwordValue" id="password" :feedback="false" toggleMask />
            <label for="password">Password</label>
          </FloatLabel>
        </div>
        <div class="card flex justify-center">
          <Button label="Submit" @click="signIn" />
        </div>
      </div>
    </div>
    <div class="card flex justify-center">
      <div v-if="SignUp">
        <Button label="Sign In" @click="toggleSignView" />
      </div>

      <div v-if="!SignUp">
        <Button label="Sign Up" @click="toggleSignView" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
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

<style scoped>
#title {
  text-align: center;
}
#pass-user-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
label {
  padding-right: 0.5rem;
}
.card {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}
#username,
#email {
  padding-right: 2.5rem;
}
.input {
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
}
</style>
