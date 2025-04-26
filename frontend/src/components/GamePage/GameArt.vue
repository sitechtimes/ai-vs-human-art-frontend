<template>
  <div v-if="artPieces.length" class="flex flex-col items-center h-[calc(100%-68px)] w-full">
    <div
      class="flex flex-row gap-5 m-[5vh] mb-[9vh] flex justify-center items-center h-screen md:justify-between md:gap-10 items-center lg:gap-10 xl:max-w-[50dvw] lg:max-h-[60dvh] lg:max-w-[70dvw] max-w-full md:max-w-[80dvw] md:flex-row"
    >
      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image :src="artPieces[0]" alt="" class="object-contain justify-center" preview />
        </div>

        <Button
          label="Image 1"
          :disabled="buttonDisabled"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(0)"
        ></Button>
      </div>

      <span class="mb-16">vs</span>

      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image :src="artPieces[1]" class="object-contain justify-center" preview />
        </div>

        <Button
          label="Image 2"
          :disabled="buttonDisabled"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(1)"
        ></Button>
      </div>
    </div>
    <div>
      <div id="result">
        <!-- eslint-disable vue/no-v-model-argument -->
        <Dialog v-model:visible="isVisible" modal>
          <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
          <p v-if="isCorrect">Your answer is correct!</p>
          <p v-else>Your answer is incorrect!</p>
          <Button label="Try Again?" class="flex self-center" @click="getArt"></Button>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import { useSaveStore } from '../../stores/savegame.js'

import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.js'

const artStore = useArtStore()
const saveStore = useSaveStore()
const artPieces = ref([])
const isVisible = ref(false)
const gameAnswer = ref(1) // which one is ai
const isCorrect = ref(false)
const humanArt = ref([])
const aiArt = ref([])
const buttonDisabled = ref(true)

const populateDictionaries = async (category) => {
  artPieces.value = []
  if (!category || category == 'Randomized') {
    humanArt.value = await artStore.getAllArt('human')
    aiArt.value = await artStore.getAllArt('ai')
  } else {
    humanArt.value = await artStore.getArtByType('human', `${category}`)
    aiArt.value = await artStore.getArtByType('ai', `${category}`)
  }
}

const getArt = async () => {
  isVisible.value = false
  artPieces.value = []
  artPieces.value = [
    humanArt.value[Math.floor(Math.random() * humanArt.value.length)],
    aiArt.value[Math.floor(Math.random() * aiArt.value.length)]
  ]
  gameAnswer.value = 1
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
  } else if (Math.random() < 0.5) {
    artPieces.value.reverse()
    gameAnswer.value = 0
  }
}

const checkAnswer = (e) => {
  if (e !== gameAnswer.value) {
    isCorrect.value = false
    artStore.combo = 0
  } else {
    isCorrect.value = true
    artStore.combo++
  }
  isVisible.value = !isVisible.value
  saveStore.total++
  buttonDisabled.value = !buttonDisabled.value

  setTimeout(getArt, 1500)
}

watch(artPieces, () => {
  buttonDisabled.value = !buttonDisabled.value
})

watch(
  () => artStore.imageType,
  async () => {
    //async (newType) => { .. if (artStore.imageType !== newType) {
    artPieces.value = [] // clears art
    await populateDictionaries(artStore.imageType) // fills dictionaries with new art
    getArt(humanArt, aiArt) // chooses random art from new dictionaries
  }
)

onMounted(() => {
  getArt()
})
</script>

<style scoped></style>

<!-- overall tally of all users + one of individual users -->
<!-- dmeographic data? -->
