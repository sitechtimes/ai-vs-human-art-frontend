<template>
  <div class="m-0">
    <Toolbar class="!rounded-none !fixed w-screen m-0 !bottom-0 right-0 left-0 z-40">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ artStore.combo }}</p>
      </template>
      <template #end>
        <Button @click="toggleHelpButton">Help</Button>
      </template>
    </Toolbar>
    <!-- eslint-disable vue/no-v-model-argument -->
    <Dialog v-model:visible="helpButton" modal>
      <p>Help / Instructions</p>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useArtStore } from '../../stores/art'

const artStore = useArtStore()
const helpButton = ref(false)

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
</script>

<style scoped></style>
