import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArt = defineStore('image', () => {
  //state
  const aiArt = ref(null)
  const humanArt = ref(null)
})
