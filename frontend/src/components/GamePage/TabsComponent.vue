<template>
  <div id="themes">
    <Tabs value="0" class="w-screen">
      <TabList class="flex flex-wrap overflow-auto">
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

<style scoped></style>
