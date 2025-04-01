<template>
  <div class="m-0 max-w-full">
    <Toolbar class="!rounded-none !fixed w-screen !bottom-0 z-40">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ saveStore.combo }}</p>
        <p class="ml-6" v-if="userStore.currentUser">High Score: {{ highScore.value }}</p>
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
import { ref, watch } from 'vue'
import { useSaveStore } from '../../stores/savegame'
import { useUserStore } from '../../stores/user'
import HelpInstructions from './HelpInstructions.vue'
import { high } from '@cloudinary/url-gen/qualifiers/videoCodecProfile'

const saveStore = useSaveStore()
const userStore = useUserStore()
const helpButton = ref(false)
const highScore = ref()

const toggleHelpButton = () => {
  helpButton.value = !helpButton.value
}

watch(highScore, async (userStore.currentUser.highScore, saveStore.combo) => {
  if (userStore.currentUser.highScore < saveStore.combo) {
    highScore.value = saveStore.combo
  }else if (saveStore.combo<userStore.currentUser.highScore) {

  } else {

  }
})

const changeHighScore = reactive(() => {
  highScore.value = userStore.currentUser.highScore
  if (highScore.value < userStore.combo) {
    highScore.value = userStore.combo
  }
})
</script>

<style scoped></style>
