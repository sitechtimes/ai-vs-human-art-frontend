<template>
  <div>
    <h1 id="title">
      Sign
      <select v-model="SignUp" @change="funny">
        <option :value="true">Up</option>
        <option :value="false">In</option>
        <option value="funny">Out</option>
      </select>
    </h1>

    <!-- SIGN OUT -->
    <div v-if="SignUp === 'funny'">
      <p class="card flex justify-center input">You are now signed out.</p>
    </div>

    <!-- SIGN UP -->
    <div v-else-if="SignUp">
      <div id="pass-user-container">
        <div class="card flex justify-center input">
          <FloatLabel>
            <InputText id="username" v-model="usernameValue" />
            <label for="username">Username</label>
          </FloatLabel>
        </div>
        <div class="card flex justify-center input" id="email-input">
          <FloatLabel>
            <InputText id="email" v-model="emailValue" />
            <label for="email">Email</label>
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

    <!-- SIGN IN -->
    <div v-else>
      <div id="pass-user-container">
        <div class="card flex justify-center input" id="sign-in-username">
          <FloatLabel>
            <InputText id="username" v-model="usernameValue" />
            <label for="username">Username/Email</label>
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
  </div>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const SignUp = ref<boolean | 'funny'>(false)
const usernameValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')

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

async function funny() {
  if (SignUp.value === 'funny') await userStore.logout()
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
