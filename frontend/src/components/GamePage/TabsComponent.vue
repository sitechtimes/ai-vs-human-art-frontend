<template>
  <div id="themes">
    <Tabs value="0">
      <TabList class="flex w-full max-w-screen overflow-x-auto">
        <Tab
          v-for="tab in tabsObject"
          :key="tab.value"
          :value="tab.value"
          @click="getType(tab.name)"
          class="text-[4vw] sm:text-[1vw] md:text-[3vw] lg:text-[2vw]"
          :disabled="tab.disabled"
        >
          {{ tab.name }}
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import { useArtStore } from '../../stores/art.js'
import { ref, watch } from 'vue'
const artStore = useArtStore()

const tabsObject = ref([
  { name: 'Randomized', disabled: false, value: 0 },
  { name: 'Realistic', disabled: false, value: 1 },
  { name: 'Anime', disabled: false, value: 2 },
  { name: 'Photography', disabled: false, value: 3 },
  { name: 'Still Life', disabled: false }
])
const getType = (name) => {
  for (let i = 0; i < tabsObject.value.length; i++) {
    if (name == tabsObject.value[i].name) {
      artStore.imageType = tabsObject.value[i].name
    }
  }
}
watch(
  () => artStore.imageType,
  async () => {
    for (const tab of tabsObject.value) {
      tab.disabled = true
      setTimeout(() => {
        tab.disabled = false
      }, 5000)
    }
  }
)
</script>

<style scoped></style>
