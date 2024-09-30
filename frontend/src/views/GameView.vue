<template>
  <div>
    <div class="items-center">
      <Tabs>
        <TabList class="tabs self-center">
          <Tab v-for="tab in tabs" :value="tab.value" :key="tab">{{ tab.name }}</Tab>
        </TabList>
      </Tabs>
    </div>
    <div class="flex flex-row w-full justify-center items-center">
      <Image :src="img" class="image m-7 h-[30vw]" preview />
      <p>or</p>
      <Image :src="img" class="image m-7 h-[30vw]" preview />
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
    <Toolbar class="absolute w-full bottom-0">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button" class="no-underline"
          >Home</Button
        >
      </template>
      <template #center>
        <p>COMBO: {{ combo }}</p>
      </template>
      <template #end>
        <Button @click="toggleHelpButton">Help</Button>
      </template>
    </Toolbar>
    <Dialog v-model:visible="helpButton" modal>
      <p>Help / Instructions</p>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import Image from 'primevue/image'
import Toolbar from 'primevue/toolbar'

import { ref } from 'vue'

const tabs = [
  { name: 'Randomized', value: '0' },
  { name: 'Realistic', value: '1' },
  { name: 'Anime', value: '2' },
  { name: 'Photography', value: '3' },
  { name: 'Still Life', value: '4' }
]

const isVisible = ref(false)
const helpButton = ref(false)
const combo = ref(0)
const img =
  'https://th.bing.com/th/id/OIP.R7mawz2gXi7lPv7YigIZhAHaIl?w=186&h=216&c=7&r=0&o=5&pid=1.7'

function toggleIsVisible() {
  isVisible.value = !isVisible.value
}

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
</script>

<style scoped></style>
