<template>
  <div>
    <div class="w-full bg-[var(--p-content-background)]">
      <TabsComponent class="w-min mx-auto" />
    </div>
    <GameArt />
    <GameFooter />
  </div>
</template>

<script setup>
import GameFooter from '../components/GamePage/GameFooter.vue'
// import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
import { useArtStore } from '../stores/art'
const artStore = useArtStore()
console.log(artStore.imageType)
</script>

<style scoped></style>
