<template>
  <div
    v-if="artPieces.length"
    class="flex flex-col items-center h-[calc(100%-68px)] w-full overflow-hidden"
  >
    <div
      class="flex flex-row gap-x-10 m-[5vh] justify-between items-center max-w-[50dvw] max-h-[70dvh] md:max-w-[40dvh] sm:max-h-[90dvh]"
    >
      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden max-w-full max-h-full">
          <Image
            :src="artPieces[0]"
            alt=""
            class="object-contain justify-center"
            preview
            aria-label="Image 1"
          />
        </div>

        <Button label="Image 1" class="flex self-center m-3" @click="checkAnswer(0)"></Button>
      </div>

      <span>vs</span>

      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden max-w-full max-h-full">
          <Image
            :src="artPieces[1]"
            class="object-contain justify-center"
            preview
            aria-label="Image 2"
          />
        </div>

        <Button label="Image 2" class="flex self-center m-3" @click="checkAnswer(1)"></Button>
      </div>
    </div>
    <div>
      <div id="result">
        <!-- eslint-disable vue/no-v-model-argument -->
        <Dialog v-model:visible="isVisible" modal>
          <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
          <p v-if="isCorrect">Your answer is isCorrect!</p>
          <p v-else>Your answer is inisCorrect!</p>
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

import { ref, onMounted } from 'vue'
import { useArtStore } from '../../stores/art.js'

const artStore = useArtStore()
const artPieces = ref([])
const isVisible = ref(false)
const gameAnswer = ref(1) // which one is ai
const isCorrect = ref(false)

const portraitBools = {
  0: ref(true),
  1: ref(true)
}

const getArt = async () => {
  isVisible.value = false
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  gameAnswer.value = 1
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
  }
  if (Math.random() < 0.5) {
    artPieces.value.reverse()
    gameAnswer.value = 0
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
  if (e != gameAnswer.value) {
    isCorrect.value = false
    artStore.combo = 0
  } else {
    isCorrect.value = true
    artStore.combo++
  }
  isVisible.value = !isVisible.value
}

onMounted(() => {
  getArt()
})
</script>

<style scoped></style>
