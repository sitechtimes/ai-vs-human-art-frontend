<template>
  <div>
    <h1 class="my-2 text-center text-2xl font-bold">Sign {{ signUp ? 'Up' : 'In' }}</h1>
    <div class="flex flex-col items-center">
      <label for="switcher">
        <span class="italic">
          {{ signUp ? `Already have an account?` : `Don't have an account?` }}
        </span>
      </label>
      <button id="switcher" @click="signUp = !signUp">
        <span class="underline">
          {{ signUp ? 'Sign in' : 'Sign up' }}
        </span>
      </button>
    </div>
    <div class="flex flex-col items-center gap-2">
      <form action="submit" class="flex flex-col gap-2">
        <TransitionGroup>
          <label for="username" v-if="signUp" :key="'username.label'">Username</label>
          <label for="username" v-if="!signUp" :key="'useremail.label'">Username/Email</label>
          <InputText
            id="username"
            v-model="usernameValue"
            :placeholder="signUp ? 'Username' : 'Username/Email'"
            :key="'useremail.input'"
          />
          <div v-if="signUp" class="flex flex-col gap-2">
            <label for="firstName" v-if="signUp" :key="'firstName.label'">First Name</label>
            <InputText
              id="firstName"
              v-model="firstNameValue"
              placeholder="First Name"
              :key="'firstName.input'"
            />
            <label for="lastName" v-if="signUp" :key="'lastName.label'">Last Name</label>
            <InputText
              id="lastName"
              v-model="lastNameValue"
              placeholder="Last Name"
              :key="'lastName.input'"
            />
          </div>
          <div v-if="signUp" class="flex flex-col gap-2">
            <label for="email" :key="'email.label'">Email</label>
            <InputText id="email" v-model="emailValue" placeholder="Email" :key="'email.input'" />
          </div>
          <label for="password" :key="'password.label'">Password</label>
          <Password
            v-model="passwordValue"
            inputId="password"
            :feedback="false"
            toggleMask
            placeholder="Password"
            :key="'password.input'"
          />
          <Button
            :label="signUp ? 'Sign Up' : 'Sign In'"
            @click="signUp ? registerInfo() : signIn()"
            :key="'button'"
          />
        </TransitionGroup>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const signUp = ref(false)
const usernameValue = ref(null)
const firstNameValue = ref(null)
const lastNameValue = ref(null)
const emailValue = ref(null)
const passwordValue = ref(null)

const userStore = useUserStore()

async function registerInfo() {
  console.log('resigerting')
  await userStore.register(usernameValue.value, emailValue.value, passwordValue.value)
  console.log('ur registered!')
}

async function signIn() {
  console.log('logging in')
  await userStore.login(usernameValue.value, passwordValue.value)
  console.log('u signed in!')
}
</script>

<style scoped>
.v-move,
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.v-leave-active {
  transition: all 0.1s ease-in;
  position: absolute;
  transform: translateY(1rem);
}
</style>
