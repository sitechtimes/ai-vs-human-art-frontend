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
      <Button @click="endGame">End Game</Button>
    </div>
      <Dialog :visible="gameEnded" header="Thank you for playing!" modal>
        <p>Here are your stats:</p>
        <p> {{ saveStore.correctCounter }} / {{saveStore.total}}</p>
        <p>out of {{ saveStore.total }} games you picked {{ saveStore.correctCounter }} as AI Generated pieces. Good Job!</p>
      </Dialog>
    <GameFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GameFooter from '../components/GamePage/GameFooter.vue'
import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useSaveStore } from '../stores/savegame'
import { useUserStore } from '../stores/user'

const user = useUserStore().currentUser

const saveStore = useSaveStore()
const gameStarted = ref(false)
const gameEnded = ref(false)

//ill make this not ass later trust
function startGame() {
  gameStarted.value = true
  gameEnded.value = false
}

function endGame() {
  //there probably IS an easier way to do this that i WILL implement later :D 
  gameStarted.value = false
  gameEnded.value = true
  console.log('combo:', saveStore.combo,'total:' ,saveStore.total, 'Correct:',saveStore.correctCounter)
  if(user) {
    saveStore.saveGame(user)
  } else {
    console.log("user isnt logged in do something about it ")
  }
}

</script>

<style scoped></style>
