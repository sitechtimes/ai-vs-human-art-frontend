import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArtStore = defineStore('art', () => {
  const combo = ref(0)
  const imageType = ref('')
  //actions

  /**
   * get a random art piece from human/ai category
   * @returns {string} url to the art piece
   */
  const getRandomArt = async (type: 'human' | 'ai') => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch(`http://localhost:8000/items/random?type=${type}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data
    } catch (error) {
      console.error('failed to fetch art 💥', error)
      return null
    }
  }
  const getArtByType = async (type: 'human' | 'ai', category: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch(
        `http://localhost:3000/items/tags/${category}?type=${type}`,
        requestOptions
      )
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data
    } catch (error) {
      console.error('failed to fetch art 💥', error)
      return null
    }
  }
  // tyr having backend send two images at once to prevent ispecg element network cheating

  return {
    combo,
    getRandomArt,
    getArtByType,
    imageType
  }
})
