<template>
  <div class="flex flex-col gap-2 h-[70vh]">
    <div v-if="artPieces.length" class="flex flex-col items-center max-w-screen">
      <div class="flex flex-row gap-x-10 max-w-full justify-between items-center">
        <div class="flex flex-col items-center max-h-[70vh] max-w-[50vw]">
          <Image
            :src="artPieces[0]"
            alt=""
            class="flex m-3 max-w-full object-cover"
            preview
            aria-label="Image 1"
          />
          <Button label="Image 1" class="flex self-center" @click="checkAnswer(0)"></Button>
        </div>

        <span>vs</span>

        <div class="flex flex-col items-center max-h-[70vh] max-w-[50vw]">
          <Image
            :src="artPieces[1]"
            class="flex m-3 max-w-full object-cover"
            preview
            aria-label="Image 2"
          />
          <Button label="Image 2" class="flex self-center" @click="checkAnswer(1)"></Button>
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
