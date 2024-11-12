<template>
  <div>
    <Button label="Submit" @click="getAI" />
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { ref } from 'vue'
import { useArt } from '../../stores/image.ts'

const artStore = useArt()

const getAI = async () => {
  const res = await artStore.getRandomAI()
  console.log(artStore.aiArt)
}
</script>

<style scoped></style>
