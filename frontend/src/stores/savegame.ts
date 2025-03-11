import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSaveStore = defineStore('save', () => {
    const combo = ref(0)
    const total = ref(0)
    const user = ref()
    const correctCounter = ref(0)

    const saveGame = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                right: correctCounter.value,
                total: total.value,
                user: user.value
            })
          }
          try {
            const res = await fetch('http://localhost:3000/api/game/savegame', requestOptions)
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`)
            }
          } catch (error) {
            console.error('Save Error', error)
          }
        }

    return {
        combo,
        total,
        correctCounter,
        saveGame
    }
})