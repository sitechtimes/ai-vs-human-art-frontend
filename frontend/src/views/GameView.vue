<template>
  <div>
    <div class="w-full bg-[var(--p-content-background)]">
      <TabsComponent class="w-min mx-auto" />
    </div>
    <div class="flex flex-row w-full justify-center items-center">
      <Image :src="img" class="image m-7 h-[30vw]" preview aria-label="Option 1" />
      <p>or</p>
      <Image :src="img" class="image m-7 h-[30vw]" preview aria-label="Option 2" />
    </div>
    <div class="w-full flex justify-center">
      <Button label="Submit" @click="toggleIsVisible"></Button>
    </div>
    <div id="result">
      <!-- eslint-disable vue/no-v-model-argument -->
      <Dialog v-model:visible="isVisible" modal>
        <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
        <p>your answer is correct / incorrect or whatever</p>
        <Button label="Try Again?" @click="toggleIsVisible"></Button>
      </Dialog>
    </div>
    <GameFooter />
  </div>
</template>

<script setup lang="ts">
import GameFooter from '../components/GamePage/GameFooter.vue'
import TabsComponent from '../components/GamePage/TabsComponent.vue'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'

import { ref } from 'vue'

const isVisible = ref(false)
const img =
  'https://th.bing.com/th/id/OIP.R7mawz2gXi7lPv7YigIZhAHaIl?w=186&h=216&c=7&r=0&o=5&pid=1.7'

function toggleIsVisible() {
  isVisible.value = !isVisible.value
}
</script>

<style scoped></style>
