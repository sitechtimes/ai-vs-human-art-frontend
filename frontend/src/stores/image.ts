import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArt = defineStore('image', () => {
  //state
  const aiArt = ref(null)
  const humanArt = ref(null)

  //actions
  const getRandomHuman = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch('http://localhost:3000/items/random?type=human', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      humanArt.value = data
    } catch (error) {
      console.error('Human Art Error', error)
    }
  }

  const getRandomAI = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch('http://localhost:3000/items/random?type=ai', requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      aiArt.value = data
    } catch (error) {
      console.error('AI Art Error', error)
    }
  }

  return {
    aiArt,
    humanArt,
    getRandomAI,
    getRandomHuman
  }
})
