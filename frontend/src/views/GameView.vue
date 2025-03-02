<template>
  <div>
    <div class="w-full bg-[var(--p-content-background)] mt-[58px]">
      <TabsComponent class="max-w-screen w-full" />
    </div>
    <div>
      <GameArt />
      <GameFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameFooter from '../components/GamePage/GameFooter.vue'
import TabsComponent from '../components/GamePage/TabsComponent.vue'
import GameArt from '../components/GamePage/GameArt.vue'
</script>

<style scoped></style>
