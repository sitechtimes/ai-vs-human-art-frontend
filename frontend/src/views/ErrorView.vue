<template>
  <div class="w-full flex flex-col items-center pt-5">
    <h1 class="font-black text-6xl pt-2">404 Page</h1>
    <div class="flex text-2xl pt-2">
      <p>Sorry you've attempted to reach a page that doesn't exist</p>
      <p class="pl-2 cursor-pointer" v-if="sad" @click="catAppear()">:C</p>
      <p class="pl-2" v-else>:Ɔ</p>
    </div>
    <p class="text-2xl pt-2">Please try again or try a different page.</p>
    <img src="/fatfatpankocat-panko.gif" v-if="!sad" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sad = ref(true)

const catAppear = () => {
  sad.value = !sad.value
}
</script>

<style scoped></style>
