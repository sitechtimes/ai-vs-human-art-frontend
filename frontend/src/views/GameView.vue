<template>
  <div>
    <TabsComponent/>
    <div id="options">
      <Image :src="img" class="image" preview />
      <p>or</p>
      <Image :src="img" class="image" preview />
    </div>
    <div style="width: 100%; display: flex; justify-content: center">
      <Button label="Submit" @click="toggleIsVisible" style="align-self: center"></Button>
    </div>
    <div id="result">
      <!-- eslint-disable vue/no-v-model-argument -->
      <Dialog v-model:visible="isVisible" modal>
        <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
        <p>your answer is correct / incorrect or whatever</p>
        <Button label="Try Again?" @click="toggleIsVisible"></Button>
      </Dialog>
    </div>
    <GameFooter/>
  </div>
</template>

<script setup lang="ts">
import GameFooter from '@/components/GamePage/GameFooter.vue'
import TabsComponent from '@/components/GamePage/TabsComponent.vue'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'

import { ref } from 'vue'

const isVisible = ref(false)
const img =
  'https://th.bing.com/th/id/OIP.R7mawz2gXi7lPv7YigIZhAHaIl?w=186&h=216&c=7&r=0&o=5&pid=1.7'

function toggleIsVisible() {
  isVisible.value = !isVisible.value
}

</script>

<style scoped>

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

.image {
  margin: 30px;
  height: 30vw;
}

#game-home-button {
  text-decoration: none;
}
</style>
