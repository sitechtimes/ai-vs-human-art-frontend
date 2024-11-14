import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const uploadImage = async (formData) => {
    
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.token}`},
      body: formData
    }
    try {
      const res = await fetch('http://localhost:3000/items/upload', requestOptions)
      if (!res.ok) {
        const a = await res.json()
        console.log(a.message)
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
