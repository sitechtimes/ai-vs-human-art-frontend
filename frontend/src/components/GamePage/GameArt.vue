<template>
  <div v-if="artPieces.length" class="flex flex-col items-center h-[calc(100%-68px)] w-full">
    <div
      class="flex flex-col gap-10 m-[5vh] mb-[9vh] md:mb-0 mb-6vh justify-between items-center xl:max-w-[50dvw] lg:max-h-[60dvh] lg:max-w-[70dvw] max-w-full md:max-w-[80dvw] md:flex-row"
    >
      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image
            :src="artPieces[0]"
            alt=""
            class="object-contain justify-center"
            preview
            aria-label="Image 1"
          />
        </div>

        <Button
          label="Image 1"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(0)"
        ></Button>
      </div>

      <span>vs</span>

      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image
            :src="artPieces[1]"
            class="object-contain justify-center"
            preview
            aria-label="Image 2"
          />
        </div>

        <Button
          label="Image 2"
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
          <p v-if="correct">Your answer is correct!</p>
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

import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.ts'

const artStore = useArtStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const correct = ref(false)
<<<<<<< HEAD

const getArt = async () => {
  isVisible.value = false
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
=======
const humanArt = ref([])
const aiArt = ref([])
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
const getArt = () => {
  isVisible.value = false
  artPieces.value = []
  artPieces.value = [
    humanArt.value[Math.floor(Math.random() * humanArt.value.length)],
    aiArt.value[Math.floor(Math.random() * aiArt.value.length)]
  ]
>>>>>>> 55-making-the-different-types-of-art-work-on-game
  answer.value = 1
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
    return
  } else if (Math.random() < 0.5) {
    artPieces.value.reverse()
    answer.value = 0
  }
}

const checkAnswer = (e) => {
  if (e != answer.value) {
    correct.value = false
    artStore.combo = 0
  } else {
    correct.value = true
    artStore.combo++
  }
  isVisible.value = !isVisible.value
}
onMounted(async () => {
  await populateDictionaries()
  getArt()
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
</script>

<style scoped></style>

<!-- overall tally of all users + one of individual users -->
<!-- dmeographic data? -->
