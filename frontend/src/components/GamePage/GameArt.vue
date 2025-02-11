<template>
  <div class="w-full">
    <div class="mt-[58px] w-q">
      <TabsComponent class="" />
    </div>
    <div class="flex flex-col gap-2">
      <!-- put dimensions in div and the images havea spoecific height + width and object fit cover or mandate image dimensions -->
      <div v-if="artPieces.length" class="flex flex-col items-center max-w-screen">
        <div class="flex flex-row gap-2 w-full justify-between items-center max-h-20%]">
          <div class="flex flex-col max-w-[40vw] items-center">
            <Image :src="artPieces[0]" alt="" class="flex m-7" preview aria-label="Image 1" />
            <Button label="Image 1" class="flex self-center" @click="checkAnswer(0)"></Button>
          </div>

          <span>vs</span>

          <div class="flex flex-col max-w-[40vw] items-center">
            <Image :src="artPieces[1]" alt="" class="flex m-7" preview aria-label="Image 2" />
            <Button label="Image 2" class="flex self-center" @click="checkAnswer(1)"></Button>
          </div>
        </div>
        <div>
          <div id="result">
            <!-- eslint-disable vue/no-v-model-argument -->
            <Dialog v-model:visible="isVisible" modal>
              <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
              <p v-if="correct">Your answer is correct!</p>
              <p v-else>Your answer is incorrect!</p>
              <Button
                label="Try Again?"
                class="flex self-center"
                @click="getArt(humanArt, aiArt)"
              ></Button>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TabsComponent from '../GamePage/TabsComponent.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'

import { ref, onMounted, watch, defineProps } from 'vue'
import { useArtStore } from '../../stores/art.ts'

const artStore = useArtStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const correct = ref(false)
const humanArt = ref([])
const aiArt = ref([])
const populateDictionaries = async (category) => {
  if (!category || category == 'Randomized') {
    humanArt.value = await artStore.getAllArt('human')
    aiArt.value = await artStore.getAllArt('ai')
  } else {
    humanArt.value = await artStore.getArtByType('human', `${category}`)
    aiArt.value = await artStore.getArtByType('ai', `${category}`)
  }
}
const getArt = (humanDict, aiDict) => {
  isVisible.value = false
  if (humanDict.value && aiDict.value) {
    artPieces.value = [
      humanDict.value[Math.floor(Math.random() * humanDict.value.length)],
      aiDict.value[Math.floor(Math.random() * aiDict.value.length)]
    ]
  }
}

answer.value = 1
if (artPieces.value.some((el) => el === null)) {
  alert('Failed to fetch art (boowomp)')
  artPieces.value = []
} else if (Math.random() < 0.5) {
  artPieces.value.reverse()
  answer.value = 0
}

const checkAnswer = (e) => {
  if (e != answer.value) {
    correct.value = false
    artStore.combo = 0
    console.log(artStore.combo)
  } else {
    correct.value = true
    artStore.combo++
  }
  isVisible.value = !isVisible.value
}
onMounted(async () => {
  await populateDictionaries()
  getArt(humanArt, aiArt)
})
watch(
  // vue docs calls this "destructutred prop watching"
  () => artStore.imageType,
  async () => {
    artPieces.value = [] // clears art
    await populateDictionaries(artStore.imageType) // fills dictionaries with new art
    getArt(humanArt, aiArt) // chooses random art from new dictionaries
  }
)
</script>

<style scoped></style>

<!-- overall tally of all users + one of individual users -->
<!-- dmeographic data? -->
