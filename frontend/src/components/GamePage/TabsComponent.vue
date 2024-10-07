<template>
  <div id="themes">
    <Tabs value="0">
      <TabList class="tabs self-center">
        <Tab v-for="tab in tabs" :value="tab.value" :key="tab">{{ tab.name }}</Tab>
      </TabList>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

const tabs = [
  { name: 'Randomized', value: '0' },
  { name: 'Realistic', value: '1' },
  { name: 'Anime', value: '2' },
  { name: 'Photography', value: '3' },
  { name: 'Still Life', value: '4' }
]
</script>

<style scoped></style>
