<template>
  <div id="themes">
    <Tabs value="0">
      <TabList class="tabs grid items-stretch w-full">
        <Tab
          v-for="tab in tabsObject"
          :value="tab.value"
          :key="tab.value"
          @click="getType(tab.value)"
          class="justify-self-auto"
          :disabled="tab.disabled"
          >{{ tab.name }}</Tab
        >
      </TabList>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import { useArtStore } from '../../stores/art.ts'
import { ref, watch } from 'vue'
const artStore = useArtStore()

const tabsObject = ref([
  { name: 'Randomized', value: '0', disabled: false },
  { name: 'Realistic', value: '1', disabled: false },
  { name: 'Anime', value: '2', disabled: false },
  { name: 'Photography', value: '3', disabled: false },
  { name: 'Still Life', value: '4', disabled: false }
])

const getType = (value) => {
  for (let i = 0; i < tabs.value.length; i++) {
    if (value == tabs.value[i].value) {
      artStore.imageType = tabs.value[i].name
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
