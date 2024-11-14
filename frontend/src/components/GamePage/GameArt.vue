<template>
  <div class="flex flex-row">
    <Button label="Submit" @click="getArt" />
    <img :src="firstImage.value" alt="" class="flex m-7 h-[30vw]" />
    <img :src="secondImage.value" alt="" class="flex m-7 h-[30vw]" />
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { ref } from 'vue'
import { useArt } from '../../stores/image.ts'

const artStore = useArt()
const artPieces = ref([])
const firstImage = ref('')
const secondImage = ref('')

const getAI = async () => {
  await artStore.getRandomAI()
  artPieces.value.push(artStore.aiArt)
}

const getHuman = async () => {
  await artStore.getRandomHuman()
  artPieces.value.push(artStore.humanArt)
}

const getArt = async () => {
  artPieces.value = []
  await getAI()
  await getHuman()
  const random = Math.round(Math.random())
  console.log(random)
  if (random) {
    artPieces.value[1] = firstImage.value
    artPieces.value[0] = secondImage.value
  } else {
    artPieces.value[0] = firstImage.value
    artPieces.value[1] = secondImage.value
  }
}
</script>

<style scoped></style>
