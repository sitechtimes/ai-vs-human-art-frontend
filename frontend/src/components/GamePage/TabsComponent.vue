<template>
  <div id="themes">
    <div class="min-w-max">
      <div class="justify-items-center">
        <Tabs value="0">
          <TabList class="tabs grid items-stretch w-full">
            <Tab
              v-for="tab in tabs"
              :value="tab.value"
              :key="tab.value"
              @click="getType(tab.value)"
              class="justify-self-auto"
              >{{ tab.name }}</Tab
            >
          </TabList>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

import { ref, defineExpose } from 'vue'

const type = ref<Number>()

const tabs = ref([
  { name: 'Randomized', value: '0' },
  { name: 'Realistic', value: '1' },
  { name: 'Anime', value: '2' },
  { name: 'Photography', value: '3' },
  { name: 'Still Life', value: '4' }
])

const getType = (value: Number) => {
  type.value = value
}

defineExpose({
  type
})
</script>

<style scoped></style>
