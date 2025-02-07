<template>
  <div>
    <div class="w-full bg-[var(--p-content-background)]">
      <!-- <TabsComponent class="w-min mx-auto" /> -->
    </div>
    <GameArt :watcher="watcher" />
    <GameFooter />
  </div>
</template>

<script setup>
import GameFooter from '../components/GamePage/GameFooter.vue'
// import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
import { watch, ref } from 'vue'
import { useArtStore } from '../stores/art'
const artStore = useArtStore()
const watcher = ref(1)
console.log(artStore.imageType)
watch(
  // vue docs calls this "destructutred prop watching"
  () => artStore.imageType,
  async () => {
    watcher.value++
    console.log(artStore.imageType)
  }
)
</script>

<style scoped></style>
