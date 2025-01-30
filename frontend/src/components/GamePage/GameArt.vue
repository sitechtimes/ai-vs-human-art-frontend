<template>
  <div
    v-if="artPieces.length"
    class="flex flex-col items-center h-[calc(100%-a68px)] w-100% overflow-hidden"
  >
    <div class="flex flex-row gap-x-10 m-[8vh] justify-between items-center">
      <div class="flex flex-col items-center max-h-8/10">
        <Image
          :src="artPieces[0]"
          alt=""
          class="h-3/5 w-full overflow-hidden"
          :class="[
            {
              'max-w-max h-full overflow-hidden': portraitBools[0].value,
              'max-w-max h-full overflow-hidden': !portraitBools[0].value
            }
          ]"
          preview
          aria-label="Image 1"
        />
        <Button label="Image 1" class="flex self-center m-3" @click="checkAnswer(0)"></Button>
      </div>

      <span>vs</span>

      <div class="flex flex-col items-center max-h-8/10">
        <Image
          :src="artPieces[1]"
          class="h-3/5 w-full overflow-hidden"
          :class="[
            {
              'max-w-max h-full overflow-hidden': portraitBools[1].value,
              'max-w-max h-full overflow-hidden': !portraitBools[1].value
            }
          ]"
          preview
          aria-label="Image 2"
        />
        <Button label="Image 2" class="flex self-center m-3" @click="checkAnswer(1)"></Button>
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

import { ref, onMounted } from 'vue'
import { useArtStore } from '../../stores/art.ts'

const artStore = useArtStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const correct = ref(false)

const getFromBackend = async () => {
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  // the only reason this is pulled out is so
}
const portraitBools = {
  0: ref(true),
  1: ref(true)
}

const getArt = async () => {
  isVisible.value = false
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  // await getFromBackend()
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
        console.log(portraitBools[i].value)
      }
    }
  }
}
const checkAnswer = (e) => {
  if (e != answer.value) {
    correct.value = false
    artStore.combo = 0
    console.log(artStore.combo)
  } else {
    correct.value = true
    artStore.combo++
  }
  isVisible.value = !isVisible.value
}

onMounted(() => {
  getArt()
})
</script>

<style scoped></style>
