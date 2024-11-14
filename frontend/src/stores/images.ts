import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const uploadImage = async (formData) => {
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.token}` },
      body: formData
    }
    try {
      const res = await fetch('http://localhost:3000/items/upload', requestOptions)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(`HTTP error! status: ${err.message}`)
      }
      const a = await res.json()
      return a
    } catch (error) {
      console.error(error)
    }
  }
  return {
    uploadImage
  }
})
