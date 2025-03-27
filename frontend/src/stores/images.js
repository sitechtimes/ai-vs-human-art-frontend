import { defineStore } from 'pinia'
const backend = import.meta.env.VITE_PUBLIC_BACKEND
export const useImageStore = defineStore('image', () => {
  const uploadImage = async (formData) => {
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.token}` },
      body: formData
    }

    const res = await fetch(`${backend}/items/upload`, requestOptions)
    if (!res.ok) console.error(`HTTP error! status: ${res.status}`)
    return res
  }
  return {
    uploadImage
  }
})
