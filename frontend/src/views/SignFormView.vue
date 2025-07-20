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
      <div>
        <form @submit.prevent="signUp ? registerInfo() : signIn()">
          <TransitionGroup>
            <div class="grid grid-flow-row auto-rows-max w-1/9 md:w-1/7 xl:w-1/5 place-self-center items-center text-lg gap-y-2">
              <div v-if="signUp" class="flex flex-col">
              <label for="username" key="username.label">Username</label>
              <InputText
                id="username"
                v-model="username"
                placeholder="Username"
                key="username.input"
              />
              </div>
              <div class="flex flex-col">
              <label for="email" key="email.label">Email</label>
              <InputText id="email" v-model="email" placeholder="Email" key="email.input" />
              </div>
              <div class="flex flex-col">
              <label for="password" key="password.label">Password</label>
              <Password
                v-model="password"
                inputId="password"
                :feedback="false"
                toggleMask
                placeholder="Password"
                key="password.input"
                class="flex flex-col"
              />
              </div>
              <div v-if="signUp" class="flex flex-col">
              <label for="password-confirm" key="password-confirm.label">Confirm Password</label>
              <Password
                inputId="password-confirm"
                v-model="passwordConfirm"
                placeholder="Confirm Password"
                :feedback="false"
                toggleMask
                key="password-confirm.input"
                class="flex flex-col"
              />
              </div>
            </div>
            <p v-if="notMatch" class="text-rose-600 font-bold place-self-center text-center mt-2" key="not-match-notif">
                Your passwords do not match!
            </p>
            <p v-if="signUp" class="text-rose-600 place-self-center text-center mt-2" key="not-match-notif">
                Usernames must be at least 4 letters long.
            </p>
            <div class="flex flex-col items-center w-4/5 md:w-full place-self-center">
              <div v-if="signUp" class="flex items-center gap-2 mt-2 text-center">
                <label id="tos-label">I confirm that I am 18+ and have agreed to the 
                  <RouterLink to="/tos" class="underline text-blue-600">consent forms.</RouterLink> 
                </label>
                <Checkbox v-model="checked" :binary="true" />
              </div>
              <div v-if="signUp" class="flex items-center gap-2 mt-2 text-center">
                <label id="tos-label">I confirm that I have read and agreed to the 
                  <RouterLink to="/tos" class="underline text-blue-600">terms of service.</RouterLink>
                </label>
                <Checkbox v-model="checked2" :binary="true" />
              </div>
              <Button 
                :label="signUp ? 'Sign Up' : 'Sign In'"
                :disabled="signUp ? !termsAgreedTo: notMatch"
                :class="notMatch ? '!cursor-not-allowed' : 'cursor-pointer'"
                key="button"
                type="submit"
                class="mt-4"
                @click:v-model="signInLoad"
              />
            </div>
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
import Checkbox from 'primevue/checkbox'
import { useRouter } from 'vue-router'

import { ref, watch, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { none } from '@cloudinary/url-gen/qualifiers/progressive'

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
  if(res === undefined){
    alert('An account registration error has occured. Please do not leave any empty fields, usernames must be at least 4 letters long, and ensure that this email has not already been used to by another account.')
  }
  
  if (res !== undefined) {
    signUp.value = !signUp.value
  } 
}

const signIn = async () => {
  try {
    await userStore.login(email.value, password.value)
  } catch (error) {
    alert('Wrong username or password. Please retry.')
  }
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

const checked = ref(false)
const checked2 = ref(false)
const signInLoad = ref(false)

const termsAgreedTo = computed(
  () => checked.value && checked2.value
)

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
