<template>
  <div class="">
    <div class="w-full bg-[var(--p-content-background)] mt-[58px]">
      <TabsComponent class="max-w-screen w-full" />
    </div>
    <div class="flex flex-col">
      <Button v-if="!gameStarted" class="self-center w-2/5 mt-60" @click="startGame"
        >Start Game</Button
      >
    </div>
    <div v-if="gameStarted" class="flex flex-col h-[75vh]">
      <GameArt />
      <Button @click="endGame" class="self-center w-2/5 mb-0">End Game</Button>
    </div>
    <div id="results" class="flex flex-col">
      <Dialog v-model:visible="results" header="Thank you for playing!" modal>
        <p>Here are your stats:</p>
        <p>{{ saveStore.right }} / {{ saveStore.total }}</p>
        <p>
          out of {{ saveStore.total }} games you picked {{ saveStore.right }} as AI Generated
          pieces. Good Job!
        </p>
        <br />
        <router-link to="/sign" class="underline" v-if="!userStore.currentUser"
          >Please sign in to save your game</router-link
        >
      </Dialog>
    </div>
    <GameFooter />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import GameFooter from '../components/GamePage/GameFooter.vue'
import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useSaveStore } from '../stores/savegame'
import { useUserStore } from '../stores/user'

const saveStore = useSaveStore()
const userStore = useUserStore()
const gameStarted = ref(false)

const results = ref(false)

const startGame = () => {
  gameStarted.value = true
}

const endGame = async () => {
  console.log('ended')
  gameStarted.value = false
  results.value = true
  if (userStore.currentUser) {
    console.log('started')
    await userStore.updateHighScore(saveStore.highScore, userStore.userId)
    console.log('wow')
    await saveStore.saveGame()
    console.log('wow done')
  }
}

onMounted(async () => {
  await saveStore.setScore()
})
</script>

<style scoped></style>
