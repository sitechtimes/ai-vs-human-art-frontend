import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const uploadImage = async (type: string, link: File) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: type,
        link: link
      })
    }
    try {
      const res = await fetch('http://localhost:3000/items/upload', requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return {
    uploadImage
  }
})
