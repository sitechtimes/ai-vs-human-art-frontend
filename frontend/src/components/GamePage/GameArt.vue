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
const artPieces = []
const firstImage = ref('')
const secondImage = ref('')
const art = []

const getAI = async () => {
  try {
    await artStore.getRandomAI()
    artPieces.push(artStore.aiArt)
  } catch (error) {
    console.log(error)
  }
}

const getHuman = async () => {
  try {
    await artStore.getRandomHuman()
    console.log(artStore.humanArt)
    artPieces.push(artStore.humanArt)
  } catch (error) {
    console.log(error)
  }
}

const getArt = async () => {
  await getAI()
  await getHuman()
  // art = JSON.parse(JSON.stringify(artPieces))
  console.log(artPieces[1])
  const random = Math.round(Math.random())
  console.log(artPieces)
  console.log(random)
  if (random) {
    console.log(artPieces[1])
    artPieces[1] = firstImage.value
    artPieces[0] = secondImage.value
    console.log(artPieces[1])
    console.log(firstImage.value, secondImage.value)
  } else {
    artPieces[0] = firstImage.value
    artPieces[1] = secondImage.value
    console.log(firstImage.value, secondImage.value)
  }
}
</script>

<style scoped></style>
