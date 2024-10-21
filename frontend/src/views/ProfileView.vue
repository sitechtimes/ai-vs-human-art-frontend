<template>
    <p>Profile Page</p>
    <div class="border-2 w-48 content-center ...">
        <img src="/nagi.jpg" alt="placeholder avatar" class="rounded-full h-36 m-3 ..."/>
    </div>
    <div>
        <label for="username">Username</label>
        <InputText id="username" v-model="username"  variant="filled" disabled></InputText>
    </div>
    <div>
        <label for="email">Email</label>
        <InputText id="email" v-model="email" variant="filled" disabled></InputText>
    </div>
    <div>
        <Button @click="logout()">Log Out</Button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const userStore = useUserStore()
const user = userStore.currentUser
console.log(user)
const username = ref('')
const email = ref('')

function logout() {
    userStore.logout
}
</script>

<style scoped>

</style>