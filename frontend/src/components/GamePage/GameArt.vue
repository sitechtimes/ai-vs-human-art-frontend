<template>
  <div class="flex flex-col gap-2">
    <Button label="Fetch" @click="getArt" :disabled="loading" />
    <div v-if="!loading && artPieces.length" class="flex flex-col items-center max-w-screen">
      <h1 class="text-8xl font-extrabold italic font-serif">WHO WOULD WIN</h1>
      <div class="flex flex-row gap-2 w-full justify-between items-center">
        <img :src="artPieces[0]" alt="" class="w-5/12" />
        <span>vs</span>
        <img :src="artPieces[1]" alt="" class="w-5/12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { ref } from 'vue'
import { useArtStore } from '../../stores/art.ts'

const artStore = useArtStore()
const artPieces = ref([])
const loading = ref(false)

const getArt = async () => {
  loading.value = true
  artPieces.value = [await artStore.getRandomArt('human'), await artStore.getRandomArt('ai')]
  if (artPieces.value.some((el) => el === null)) {
    alert('failed to fetch (womp womp)')
    artPieces.value = []
  } else if (Math.random() < 0.5) artPieces.value.reverse()

  loading.value = false
}
</script>

<style scoped></style>
