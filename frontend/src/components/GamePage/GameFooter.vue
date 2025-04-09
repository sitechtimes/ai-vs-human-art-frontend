<template>
  <div class="max-w-full m-0">
    <Toolbar class="!rounded-none !fixed w-screen !bottom-0">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <div class="flex flex-col items-center md:flex-row lg-flex-row">
          <p>COMBO: {{ saveStore.combo }}</p>
          <p class="md:ml-4 lg:ml-8" v-if="userStore.currentUser">High Score: {{ saveStore.highScore }}</p>
        </div>
      </template>
      <template #end>
        <Button @click="toggleHelpButton">Instructions</Button>
      </template>
    </Toolbar>
    <!-- eslint-disable vue/no-v-model-argument -->
    <Dialog v-model:visible="helpButton" header="Instructions / How to play" class="w-4/5" modal>
      <HelpInstructions />
    </Dialog>
  </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useSaveStore } from '../../stores/savegame'
import { useUserStore } from '../../stores/user'
import HelpInstructions from './HelpInstructions.vue'

const saveStore = useSaveStore()
const userStore = useUserStore()
const helpButton = ref(false)

const toggleHelpButton = () => {
  helpButton.value = !helpButton.value
}
</script>

<style scoped></style>
