<template>
    <p>Profile Page</p>
    <div class="border-2">
        <img src="/nagi.jpg" alt="placeholder avatar" class="rounded-full h-36 m-3 ..."/>
    </div>
    <div>
        <label for="username">Username</label>
        <InputText id="username" v-model="username"  variant="filled" disabled></InputText>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'

const username = ref('')
</script>

<style scoped>

</style>