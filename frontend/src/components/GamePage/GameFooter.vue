<template>
  <div>
    <Toolbar class="fixed w-screen bottom-0">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ combo }}</p>
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
import { computed, ref } from 'vue'
import { useArtStore } from '../../stores/art.ts'

// const combo = ref(0)
const artStore = useArtStore()
const combo = computed(() => {
  console.log(artStore.combo)
  return artStore.combo
})
const helpButton = ref(false)

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
</script>

<style scoped></style>
