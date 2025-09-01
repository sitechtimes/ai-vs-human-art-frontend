<template>
  <div v-if="artPieces.length" class="flex flex-col items-center h-[calc(100%-68px)] w-full">
    <div
      class="flex-row md:grid md:grid-cols-3 gap-5 m-[5vh] mb-[9vh] flex justify-center h-screen md:justify-between md:gap-10 items-center lg:gap-10 xl:max-w-[50dvw] lg:max-h-[50dvh] lg:max-w-[70dvw] max-w-full md:max-w-[80dvw] md:flex-row"
    >
      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image :src="artPieces[0]" alt="" class="object-contain justify-center" preview />
        </div>

        <Button
          label="Image 1"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(0)"
          :disabled="buttonDisabled"
        ></Button>
      </div>

      <span class="mb-16 place-self-center">vs</span>

      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image :src="artPieces[1]" class="object-contain justify-center" preview />
        </div>

        <Button
          label="Image 2"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(1)"
          :disabled="buttonDisabled"
        ></Button>
      </div>
    </div>
    <div>
      <div id="result">
        <Toast />
        <!-- eslint-disable vue/no-v-model-argument -->
        <!-- <Dialog v-model:visible="isVisible" modal> -->
        <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
        <!-- <p v-if="isCorrect">Your answer is correct!</p>
          <p v-else>Your answer is incorrect!</p>
          <Button label="Try Again?" class="flex self-center" @click="getArt"></Button>
        </Dialog> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Image from 'primevue/image'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.js'
import { useSaveStore } from '../../stores/savegame.js'

const toast = useToast()

const buttonDisabled = ref(false)
const artStore = useArtStore()
const saveStore = useSaveStore()
const artPieces = ref([])
const isVisible = ref(false)
const gameAnswer = ref(1) // which one is ai
const isCorrect = ref(false)
const humanArt = ref([])
const displayedArtist = ref(0)
const humanArtists = ref([])
const aiArt = ref([])
const populateDictionaries = async (category) => {
  artPieces.value = []
  if (!category || category === 'Randomized') {
    const getAllHumanArt = await artStore.getAllArt('human')
    humanArt.value = getAllHumanArt.map((art) => art.secure_url)
    humanArtists.value = getAllHumanArt.map((art) => art.context)
    const getAllAiArt = await artStore.getAllArt('ai')
    aiArt.value = getAllAiArt.map((ai) => ai.secure_url)
  } else {
    humanArt.value = await artStore.getArtByType('human', `${category}`)
    aiArt.value = await artStore.getArtByType('ai', `${category}`)
  }
}

const getArt = async () => {
  isVisible.value = false
  const artNumber = Math.floor(Math.random() * humanArt.value.length)
  const aiNumber = Math.floor(Math.random() * aiArt.value.length)
  displayedArtist.value = artNumber
  artPieces.value = []
  artPieces.value = [
    humanArt.value[artNumber],
    aiArt.value[aiNumber]
  ]
  humanArt.value.splice(artNumber, 1)
  aiArt.value.splice(aiNumber, 1)
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
    saveStore.combo = 0
    toast.add({
      severity: 'error',
      summary: 'Incorrect',
      detail: `This piece was made by ${humanArtists.value[displayedArtist.value].custom.artist_name}!`,
      life: 5000
      
    })
  } else {
    isCorrect.value = true
    saveStore.right++
    saveStore.combo++
    toast.add({
      severity: 'success',
      summary: 'Correct',
      detail: `This piece was AI Generated! The real art was made by ${humanArtists.value[displayedArtist.value].custom.artist_name}!`,
      life: 5000,
      class: 'w-20'
    })
  }
  //isVisible.value = !isVisible.value for dialog
  saveStore.total++
  buttonDisabled.value = !buttonDisabled.value
  setTimeout(getArt, 1250) //set timeout is for toast, remove if using the commented out dialog
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
    getArt() // chooses random art from new dictionaries
  }
) //if image type clears

onMounted(async () => {
  await populateDictionaries(artStore.imageType)
  await getArt()
})
</script>

<style scoped></style>

<!-- overall tally of all users + one of individual users -->
<!-- dmeographic data? -->
