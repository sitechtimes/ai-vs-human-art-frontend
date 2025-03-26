import { defineStore } from 'pinia'
import { ref } from 'vue'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND

export const useSaveStore = defineStore('save', () => {
  const combo = ref(0)
  const highScore = ref(0)
  const total = ref(0)
  const correctCounter = ref(0)

  const saveGame = async (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        right: correctCounter.value,
        total: total.value,
        user: user
      })
    }
    try {
      const res = await fetch(`${backendUrl}/game/savegame`, requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    } catch (error) {
      console.error('Save Error', error)
    }
  }

  return {
    combo,
    highScore,
    total,
    correctCounter,
    saveGame
  }
})
