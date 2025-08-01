<template>
  <div class="bg-primary-100 dark:!bg-primary-900 flex flex-col rounded p-4 self-center">
    <ScrollPanel class="h-36 w-full">
      <!-- <div v-for="text in consentForm" :key="text">
        <p class="font-bold">{{ text.heading }}</p>
        <p v-for="words in text.text" :key="words">{{ words }}</p>
        <br />
      </div> -->
      <div>consent form here (add refined form)</div>
    </ScrollPanel>
    <p class="self-center">Scroll ↓</p>
  </div>
</template>

<script setup>
import ScrollPanel from 'primevue/scrollpanel'
</script>

<style scoped></style>
