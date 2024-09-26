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
      <Image :src="img" class="image" style="filter: hue-rotate(180deg)" preview />
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <Button label="Submit" @click="toggleIsVisible" style="align-self: center"></Button>
    </div>
    <div id="result">
      <!-- eslint-disable vue/no-v-model-argument -->
      <Dialog v-model:visible="isVisible" modal header="You failed!">
        <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
        <!-- skill issue above -->
        <p style="display: flex; gap: 1rem">
          Correct answer:
          <img src="/thefunny.png" />
        </p>

        <p>Your answer: 17</p>
        <Button label="Try Again?" @click="toggleIsVisible"></Button>
      </Dialog>
    </div>
    <Toolbar id="footer">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p id="combo">
          COMBO
          <span>{{ combo }}</span>
        </p>
      </template>
      <template #end>
        <Button @click="toggleHelpButton">Help</Button>
      </template>
    </Toolbar>
    <Dialog v-model:visible="helpButton" modal header="Help/Instructions">
      <p>find the impostor 📮</p>
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
  { name: 'Photography', value: '3' },
  { name: 'Still Life', value: '4' }
]

const isVisible = ref(false)
const helpButton = ref(false)
const combo = ref(0)
const img = ref('/kachow.png')

function toggleIsVisible() {
  isVisible.value = !isVisible.value
}

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
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
  left: 2.5%;
  height: 6rem;
}

#combo {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* primevue's definition of center is stupid */
  position: absolute;
  left: 0;
  right: 0;
  width: min-content;
  margin: 0 auto;
}

#combo span {
  font-size: 2rem;
}

.image {
  margin: 30px;
  height: 30vw;
}

#game-home-button {
  text-decoration: none;
}
</style>
