import { defineStore } from 'pinia'
import { ref } from 'vue'

const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND

export const useArtStore = defineStore('art', () => {
  const combo = ref(0)
  const imageType = ref('Randomized')
  //actions

  /**
   * get a random art piece from human/ai category
   * @returns {string} url to the art piece
   */
  const getRandomArt = async (type) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/items/random?type=${type}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data
    } catch (error) {
      console.error('failed to fetch art 💥', error)
      return null
    }
  }
  const getArtByType = async (type, category) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/items/tags/${category}?type=${type}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data
    } catch (error) {
      console.error('failed to fetch art 💥', error)
      return null
    }
  }
  const getAllArt = async (type) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/items/gallery?type=${type}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data[0]
    } catch (error) {
      console.error('failed to fetch art 💥', error)
      return null
    }
  }

  return {
    combo,
    getRandomArt,
    getArtByType,
    imageType,
    getAllArt
  }
})
