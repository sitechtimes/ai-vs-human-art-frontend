<template>
  <div>
    <div id="themes">
      <Tabs>
        <TabList class="tabs">
          <Tab v-for="tab in tabs" :value="tab.value" :key="tab">{{ tab.name }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :value="tab.value" :key="tab">
            <p>{{ tab.name }}</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <div id="options">
      <Image :src="img" class="image" preview />
      <p>or</p>
      <Image :src="img" class="image" preview />
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <Button label="Submit" @click="answer = true" style="align-self: center"></Button>
    </div>
    <div id="result">
      <Dialog v-model:visible="answer" modal>
        <p>your answer is correct / incorrect or whatever</p>
        <Button label="Try Again?" @click="answer = false"></Button>
      </Dialog>
    </div>
    <Toolbar id="footer">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ combo }}</p>
      </template>
      <template #end>
        <Button @click="helpButton = true">Help</Button>
      </template>
    </Toolbar>
    <Dialog v-model:visible="helpButton" modal>
      <p>Help / Instructions</p>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Image from 'primevue/image'
//import Sidebar from 'primevue/sidebar';
import Toolbar from 'primevue/toolbar'

import { ref } from 'vue'

const tabs = [
  { name: 'Randomized', value: '0' },
  { name: 'Realistic', value: '1' },
  { name: 'Anime', value: '2' },
  { name: 'Photogtaphy', value: '3' },
  { name: 'Still Life', value: '4' }
]

const answer = ref(false)
const helpButton = ref(false)
const combo = ref(0)
const img =
  'https://th.bing.com/th/id/OIP.R7mawz2gXi7lPv7YigIZhAHaIl?w=186&h=216&c=7&r=0&o=5&pid=1.7'
</script>

<style scoped>
@import '../assets/themes.css';

#options {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

#themes {
  align-items: center;
}

.tabs {
  align-self: center;
}

#footer {
  position: absolute;
  width: 95%;
  bottom: 0px;
}

.image {
  margin: 30px;
  height: 30vw;
}

#game-home-button {
  text-decoration: none;
}
</style>
