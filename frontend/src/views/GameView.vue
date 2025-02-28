<template>
  <div class="">
    <div class="w-full bg-[var(--p-content-background)] mt-[58px]">
      <TabsComponent class="max-w-screen w-full" />
    </div>
    <div>
    <Button v-if="!gameStarted" @click="startGame">Start Game</Button>
  </div>
    <div v-if="gameStarted">
      <GameArt />
      <GameFooter />
      <Button @click="endGame()">End Game</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GameFooter from '../components/GamePage/GameFooter.vue'
import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
import Button from 'primevue/button'
import { useArtStore } from '../stores/art'

const artStore = useArtStore()
const gameStarted = ref(false)

function startGame() {
  gameStarted.value = true
}

function endGame() {
  console.log(artStore.combo, artStore.total, artStore.correctCounter)
}

</script>

<style scoped></style>
