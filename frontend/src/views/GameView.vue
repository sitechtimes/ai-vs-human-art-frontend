<template>
  <div>
    <div class="w-full bg-[var(--p-content-background)]">
      <!-- <TabsComponent class="w-min mx-auto" /> -->
    </div>
    <GameArt :key="watched" />
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
const watched = ref()
console.log(artStore.imageType)
/* watch(artStore.imageType, async () => {
  watched.value = 1 // wil reload page
  console.log(artStore.imageType)
})  -- need to figure out how to force reload component*/
</script>

<style scoped></style>
