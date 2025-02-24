<template>
  <div id="themes m-0 max-w-full">
    <Tabs value="0" class="w-screen">
      <TabList class="flex flex-wrap overflow-scroll">
        <Tab v-for="tab in tabs" :value="tab.value" :key="tab.value" class="text-xs md:text-base">{{
          tab.name
        }}</Tab>
      </TabList>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

const tabs = [
  { name: 'Random', value: '0' },
  { name: 'Realistic', value: '1' },
  { name: 'Anime', value: '2' },
  { name: 'Cartoon', value: '3' }
]
</script>

<style scoped>
@media (min-width: 768px) {
  .tab {
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
  }
}

@media (min-width: 1024px) {
  .tab {
    font-size: 1rem; /* 16px */
    line-height: 1.5rem; /* 24px */
  }
}
</style>
