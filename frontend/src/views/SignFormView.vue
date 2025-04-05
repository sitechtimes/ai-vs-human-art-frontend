<template>
  <div class="mt-[58px]">
    <div class="mt-[5vh]">
      <h1 class="my-2 text-center text-4xl font-bold">Sign {{ signUp ? 'Up' : 'In' }}</h1>
      <div class="flex flex-col items-center text-base">
        <span class="italic">
          {{ signUp ? `Already have an account?` : `Don't have an account?` }}
        </span>
        <button
          id="switcher"
          class="underline"
          @click="
            () => {
              signUp = !signUp
              notMatch = false
            }
          "
        >
          {{ signUp ? 'Sign in' : 'Sign up' }}
        </button>
      </div>
      <div class="flex flex-col items-center gap-2 text-lg">
        <form @submit.prevent="signUp ? registerInfo() : signIn()" class="flex flex-col gap-2">
          <TransitionGroup>
            <div v-if="signUp" class="flex flex-col gap-2">
              <label for="username" key="username.label">Username</label>
              <InputText
                id="username"
                v-model="username"
                placeholder="Username"
                key="username.input"
              />
            </div>
            <label for="email" key="email.label">Email</label>
            <InputText id="email" v-model="email" placeholder="Email" key="email.input" />
            <label for="password" key="password.label">Password</label>
            <Password
              v-model="password"
              inputId="password"
              :feedback="false"
              toggleMask
              placeholder="Password"
              key="password.input"
            />
            <div v-if="signUp" class="flex flex-col gap-2">
              <label for="password-confirm" key="password-confirm.label">Confirm Password</label>
              <Password
                inputId="password-confirm"
                v-model="passwordConfirm"
                placeholder="Confirm Password"
                :feedback="false"
                toggleMask
                key="password-confirm.input"
              />
            </div>
            <p v-if="notMatch" class="text-rose-600 font-bold" key="not-match-notif">
              Your passwords do not match!
            </p>
            <Button
              :label="signUp ? 'Sign Up' : 'Sign In'"
              :disabled="notMatch"
              :class="notMatch ? '!cursor-not-allowed' : 'cursor-pointer'"
              key="button"
              type="submit"
            />
          </TransitionGroup>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const signUp = ref(false)
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const notMatch = ref(false)

const userStore = useUserStore()

const registerInfo = async () => {
  if ((notMatch.value = password.value !== passwordConfirm.value)) return

  const res = await userStore.register(username.value, email.value, password.value)
  if (res !== null) {
    signUp.value = !signUp.value
  }
}

const signIn = async () => {
  await userStore.login(email.value, password.value)
  if (userStore.currentUser) {
    router.push({ path: '/' })
  }
}

const evilMatch = () => {
  return (notMatch.value = password.value !== passwordConfirm.value)
}

// clear an existing warning if user matches password
// will not add warning as user types out password, because that's annoying
watch([password, passwordConfirm], () => {
  if (notMatch.value) evilMatch()
})
</script>

<style scoped>
.v-move,
.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.v-leave-active {
  transition: all 0.2s ease-in;
  position: absolute;
  transform: translateY(1rem);
}
</style>
