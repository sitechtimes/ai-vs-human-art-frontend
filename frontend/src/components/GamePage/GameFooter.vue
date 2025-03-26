<template>
  <div class="h-[90vh]">
    <Toolbar class="fixed w-screen bottom-0">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ saveStore.combo }}</p>
        <p class="ml-6">High Score: {{ user.highScore }}</p>
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
const user = useUserStore()
const helpButton = ref(false)

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
</script>

<style scoped></style>
