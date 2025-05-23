import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useUserStore } from './user'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND
const userStore = useUserStore()

export const useSaveStore = defineStore('save', () => {
  const combo = ref(0)
  const highScore = ref(0)
  const total = ref(0)
  const right = ref(0)
  const user = ref(userStore.currentUser)

  const setScore = () => {
    if (userStore.currentUser) {
      highScore.value = userStore.currentUser.highScore
      console.log(highScore.value)
    }
  }

  const saveGame = async (right, total, user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        right: right.value,
        total: total.value,
        user: user.value
      })
    }
    try {
      const res = await fetch(`${backendUrl}/game/savegame`, requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      total.value = 0
      combo.value = 0
      right.value = 0
    } catch (error) {
      console.error('Save Error', error)
    }
  }

  watch(combo, (newCombo) => {
    if (newCombo > highScore.value) {
      highScore.value = newCombo
    } else if (highScore.value >= newCombo) {
      return
    } else {
      return
    }
  })

  return {
    combo,
    highScore,
    total,
    right,
    user,
    setScore,
    saveGame
  }
})
