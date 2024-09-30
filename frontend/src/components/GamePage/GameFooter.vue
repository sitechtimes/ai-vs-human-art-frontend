<template>
    <div>
    <Toolbar id="footer">
      <template #start>
        <Button as="router-link" label="Router" to="/" id="game-home-button">Home</Button>
      </template>
      <template #center>
        <p>COMBO: {{ combo }}</p>
      </template>
      <template #end>
        <Button @click="toggleHelpButton">Help</Button>
      </template>
    </Toolbar>
    <Dialog v-model:visible="helpButton" modal>
      <p>Help / Instructions</p>
    </Dialog>
    </div>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { ref } from 'vue';

const combo = ref(0)
const helpButton = ref(false)

function toggleHelpButton() {
  helpButton.value = !helpButton.value
}
</script>

<style scoped>
#footer {
  position: fixed;
  width: 95%;
  bottom: 0px;
}

</style>