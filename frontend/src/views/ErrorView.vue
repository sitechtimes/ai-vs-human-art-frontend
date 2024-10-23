<template>
  <div class="w-full flex flex-col gap-2 items-center pt-5">
    <h1 class="font-black text-6xl">404 Page</h1>
    <div class="flex text-2xl pt-2 gap-2">
      <p>Sorry you've attempted to reach a page that doesn't exist</p>
      <span class="cursor-pointer whitespace-nowrap flex flex-nowrap" @click="sad = false">
        :
        <span class="block transition-transform" :class="{ 'rotate-180': !sad }">C</span>
      </span>
    </div>
    <p class="text-2xl">Please try again or try a different page.</p>
    <RouterLink class="underline text-xl" to="/">Go home</RouterLink>
    <img src="/fatfatpankocat-panko.gif" v-if="!sad" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const sad = ref(true)
</script>

<style scoped></style>
