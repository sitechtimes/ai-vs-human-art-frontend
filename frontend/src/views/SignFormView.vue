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
          <div v-if="signUp" class="flex flex-col gap-2">
            <label for="username" key="'username.label'">Username</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Username"
              key="'useremail.input'"
            />
          </div>
          <label for="email" key="'email.label'">Email</label>
          <InputText id="email" v-model="email" placeholder="Email" key="'email.input'" />
          <label for="password" key="'password.label'">Password</label>
          <Password
            v-model="password"
            inputId="password"
            :feedback="false"
            toggleMask
            placeholder="Password"
            key="'password.input'"
          />
          <p v-if="notMatch" class="text-rose-600 font-bold" key="notMatchNotif">
            Your passwords do not match!
          </p>
          <div v-if="signUp" class="flex flex-col gap-2">
            <label for="passwordConfirm" key="'passwordConfirm.label'">Confirm Password</label>
            <Password
              inputId="passwordConfirm"
              v-model="passwordConfirm"
              placeholder="Confirm Password"
              :feedback="false"
              toggleMask
              key="'passwordConfirm.input'"
            />
          </div>
          <Button
            :label="signUp ? 'Sign Up' : 'Sign In'"
            @click="signUp ? registerInfo() : signIn()"
            key="'button'"
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
import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const signUp = ref(false)
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const notMatch = ref(false)

const userStore = useUserStore()

async function registerInfo() {
  if (password.value != passwordConfirm.value) {
    notMatch.value = true
  } else {
    notMatch.value = false
  }
  console.log('resigerting')
  await userStore.register(username.value, email.value, password.value, passwordConfirm.value)
}

async function signIn() {
  console.log('logging in')
  try {
    await userStore.login(email.value, password.value)
  } catch (error) {
    console.log(error)
  }
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
