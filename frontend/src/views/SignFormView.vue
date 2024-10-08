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
          <label for="username">Username</label>
          <InputText
            id="username"
            v-model="usernameValue"
            :placeholder="signUp ? 'Username' : 'Username/Email'"
          />
          <div v-if="signUp" class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText id="email" v-model="emailValue" placeholder="Email" />
          </div>
          <label for="password">Password</label>
          <Password
            v-model="passwordValue"
            inputId="password"
            :feedback="false"
            toggleMask
            placeholder="Password"
          />
          <Button :label="signUp ? 'Sign Up' : 'Sign In'" @click="signUp ? registerInfo : signIn" />
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
const emailValue = ref(null)
const passwordValue = ref(null)

const userStore = useUserStore()

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
