<template>
  <div v-if="artPieces.length" class="flex flex-col items-center h-[calc(100%-68px)] w-full">
    <div
      class="flex flex-row gap-5 m-[5vh] mb-[9vh] flex justify-center items-center h-screen md:justify-between md:gap-10 items-center lg:gap-10 xl:max-w-[50dvw] lg:max-h-[60dvh] lg:max-w-[70dvw] max-w-full md:max-w-[80dvw] md:flex-row"
    >
      <div class="flex flex-col items-center">
        <div
          id="img 1"
          class="h-[40vw] w-[40vw] lg:h-[30vw] lg:w-[30vw] md:h-[30vw] md:w-[30vw] xl:h-[20vw] xl:w-[20vw]"
        >
          <Image
            :src="artPieces[0]"
            alt=""
            preview
            aria-label="Image 1"
            class="w-full h-full object-contain overflow-hidden justify-center items-center"
          />
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
        <div
          id="img 2"
          class="h-[40vw] w-[40vw] lg:h-[30vw] lg:w-[30vw] md:h-[30vw] md:w-[30vw] xl:h-[20vw] xl:w-[20vw]"
        >
          <Image
            :src="artPieces[1]"
            preview
            aria-label="Image 2"
            class="w-full h-full object-contain overflow-hidden justify-center items-center"
          />
        </div>

        <Button
          label="Image 2"
          :disabled="buttonDisabled"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(1)"
        ></Button>
      </div>
    </div>
    <div id="result">
      <Toast position="top-center" class="h-[50vw]" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
//import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.js'
import { useSaveStore } from '../../stores/savegame'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const artStore = useArtStore()
const saveStore = useSaveStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const artistPiece = ref(0)

const correct = ref(false)
const buttonDisabled = ref(true)

const toast = useToast()

function getDimensions() {
  console.log(artPieces)
}
getDimensions()

const getArt = async () => {
  isVisible.value = false
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  // await getFromBackend()
  answer.value = 1
  artistPiece.value = 0
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
  } else if (Math.random() < 0.5) {
    artPieces.value.reverse()
    answer.value = 0
    artistPiece.value = 1
  }
}

const showToast = () => {
  if (correct.value) {
    toast.add({
      severity: 'success',
      summary: 'Correct',
      detail: 'This piece was AI Generated!',
      life: 1500
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Incorrect',
      detail: `This piece was made by ${artPieces.value[artistPiece.value].context.custom.artist_name}`,
      life: 1500
    })
  }
}

const checkAnswer = (e) => {
  if (e != answer.value) {
    correct.value = false
    saveStore.combo = 0
    showToast()
  } else {
    correct.value = true
    showToast()
    saveStore.right++
    saveStore.combo++
    if (saveStore.combo > user.highScore) {
      user.highScore = saveStore.combo
    }
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
