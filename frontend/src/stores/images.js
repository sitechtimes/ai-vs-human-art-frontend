import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const uploadImage = async (formData) => {
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.token}` },
      body: formData
    }

    const res = await fetch('http://localhost:3000/items/upload', requestOptions)
    if (!res.ok) console.error(`HTTP error! status: ${res.status}`)
    return res
  }
  return {
    uploadImage
  }
})
