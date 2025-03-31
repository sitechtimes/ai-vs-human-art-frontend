<template>
  <div v-if="artPieces.length" class="flex flex-col items-center h-[calc(100%-68px)] w-full">
    <div
      class="flex flex-col gap-10 m-[5vh] mb-[9vh] md:mb-0 mb-6vh justify-between items-center xl:max-w-[50dvw] lg:max-h-[60dvh] lg:max-w-[70dvw] max-w-full md:max-w-[80dvw] md:flex-row"
    >
      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image
            :src="artPieces[0]"
            alt=""
            class="object-contain justify-center"
            preview
            aria-label="Image 1"
          />
        </div>

        <Button
          label="Image 1"
          :disabled="buttonDisabled"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(0)"
        ></Button>
      </div>

      <span>vs</span>

      <div class="flex flex-col items-center">
        <div class="flex overflow-hidden">
          <Image
            :src="artPieces[1]"
            class="object-contain justify-center"
            preview
            aria-label="Image 2"
          />
        </div>

        <Button
          label="Image 2"
          :disabled="buttonDisabled"
          class="flex self-center m-3 scale-90 sm:scale-100"
          @click="checkAnswer(1)"
        ></Button>
      </div>
    </div>
    <div>
      <div id="result">
        <Toast />
        <!-- eslint-disable vue/no-v-model-argument -->
        <!-- i think v-model:visible is the only way to toggle visibility with this primevue component, so unfortunately were going to have to break an eslint rule -->
        <!--         <Dialog v-model:visible="isVisible" modal>
          <p>peepeepoopoo</p>
        </Dialog> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
//import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

import { ref, onMounted, watch } from 'vue'
import { useArtStore } from '../../stores/art.js'
import { useSaveStore } from '../../stores/savegame'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const artStore = useArtStore()
const saveStore = useSaveStore()
const artPieces = ref([])
const isVisible = ref(false)
const answer = ref(1) // which one is ai
const correct = ref(false)
const buttonDisabled = ref(true)

const toast = useToast()

const getArt = async () => {
  isVisible.value = false
  artPieces.value = []
  artPieces.value = [
    humanArt.value[Math.floor(Math.random() * humanArt.value.length)],
    aiArt.value[Math.floor(Math.random() * aiArt.value.length)]
  ]
  answer.value = 1
  if (artPieces.value.some((el) => el === null)) {
    alert('Failed to fetch art (boowomp)')
    artPieces.value = []
    return
  } else if (Math.random() < 0.5) {
    artPieces.value.reverse()
    answer.value = 0
  }
}

function showToast() {
  if (correct.value) {
    toast.add({
      severity: 'success',
      summary: 'Correct',
      detail: 'This piece was AI Generated!',
      life: 1500
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Incorrect',
      detail: 'This piece was made by {{artist name //placeholder?}}',
      life: 1500
    })
  }
}

const checkAnswer = (e) => {
  if (e != answer.value) {
    correct.value = false
    saveStore.combo = 0
    showToast()
  } else {
    correct.value = true
    showToast()
    saveStore.correctCounter++
    saveStore.combo++
    if (saveStore.combo > user.highScore) {
      user.highScore = saveStore.combo
    }
  }
  isVisible.value = !isVisible.value
  saveStore.total++
  buttonDisabled.value = !buttonDisabled.value

  setTimeout(getArt, 1500)
}

watch(artPieces, () => {
  buttonDisabled.value = !buttonDisabled.value
})

watch(
  () => artStore.imageType,
  async () => {
    //async (newType) => { .. if (artStore.imageType !== newType) {
    artPieces.value = [] // clears art
    await populateDictionaries(artStore.imageType) // fills dictionaries with new art
    getArt(humanArt, aiArt) // chooses random art from new dictionaries
  }
)
</script>

<style scoped></style>

<!-- overall tally of all users + one of individual users -->
<!-- dmeographic data? -->
