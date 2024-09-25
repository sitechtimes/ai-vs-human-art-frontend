<template>
  <div>
    <div v-if="SignUp">
      <div id="pass-user-container">
        <h1 id="title">Sign Up</h1>
        <div class="card flex justify-center">
          <FloatLabel>
            <label for="username">Username</label>
            <InputText id="username" v-model="usernameValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center" id="email-input">
          <FloatLabel>
            <label for="email">Email</label>
            <InputText id="email" v-model="emailValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center">
          <FloatLabel>
            <label for="password">Password</label>
            <Password v-model="passwordValue" :feedback="false" id="password" />
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
        <div class="card flex justify-center">
          <FloatLabel>
            <label for="username">Username/Email</label>
            <InputText id="username" v-model="usernameValue" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center">
          <FloatLabel>
            <label for="password">Password</label>
            <Password v-model="passwordValue" :feedback="false" id="password" />
          </FloatLabel>
        </div>
        <div class="card flex justify-center">
          <Button label="Submit" @click="registerInfo" />
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
  console.log('this should work properly lololol')
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
  padding: 0.5rem;
  justify-content: center;
}
#email-input {
  padding-left: 2rem;
}
</style>
