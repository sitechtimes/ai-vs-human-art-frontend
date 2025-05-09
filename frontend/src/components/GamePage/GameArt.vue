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
import Image from 'primevue/image'
import Dialog from 'primevue/dialog'
import { useSaveStore } from '../../stores/savegame.js'
import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.js'
import { useUserStore } from '../../stores/user.js'
import { useToast } from 'primevue/usetoast'

const artStore = useArtStore()
const userStore = useUserStore()
const user = userStore.currentUser
const saveStore = useSaveStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const isCorrect = ref(false)
const humanArt = ref([])
const aiArt = ref([])
const buttonDisabled = ref(false)
const toast = useToast()

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
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  answer.value = 1
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
  } else if (Math.random() < 0.5) {
    artPieces.value.reverse()
    answer.value = 0
  }
  for (let i = 0; i < artPieces.value.length; i++) {
    let getImg = new window.Image()
    getImg.src = artPieces[i]
    getImg.onload = () => {
      if (getImg.width <= getImg.height) {
        portraitBools[i].value = true
      }
    }
  }
}

const checkAnswer = (e) => {
  if (e !== answer.value) {
    isCorrect.value = false
    saveStore.combo = 0
    toast.add({
      severity: 'error',
      summary: 'Incorrect',
      detail: `This piece was made by ${artPieces.value[answer.value].context.custom.artist_name}`,
      life: 1500
    })
  } else {
    isCorrect.value = true
    toast.add({
      severity: 'success',
      summary: 'Correct',
      detail: 'This piece was AI Generated!',
      life: 1500
    })
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
    artPieces.value = [] // clears art
    await populateDictionaries(artStore.imageType) // fills dictionaries with new art
    getArt(humanArt, aiArt) // chooses random art from new dictionaries
  }
)

onMounted(async () => {
  await populateDictionaries(artStore.imageType) // fills dictionaries with new art
  getArt(humanArt, aiArt)
})
</script>

<style scoped></style>
