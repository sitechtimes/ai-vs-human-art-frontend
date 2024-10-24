<template>
    <Message severity="warn" v-if="visible">You are NOT logged in</Message>
    <div class="flex justify-center items-center">
        <img src="/nagi.jpg" alt="placeholder avatar" class="rounded-full h-36 m-3"/>
    </div>
    <div class="content-center">
        <div>
            <Fieldset legend="Username">
                <p>{{ username }}</p>
            </Fieldset>
        </div>
        <div>
            <Fieldset legend="Email">
                <p>{{ email }}</p>
            </Fieldset>
        </div>
    </div>
    <div>
        <Button @click="logout">Log Out</Button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import Message from 'primevue/message'

const userStore = useUserStore()
const user = userStore.currentUser
const username = ref('')
const email = ref('')
const visible = ref(true)

const logout = () => userStore.logout()

function getData(user: { username: string, email: string }) {
    visible.value = false
    console.log(user)
    username.value = user.username
    email.value = user.email
}
if (user) {
    getData(user)
}
</script>

<style scoped>

</style>