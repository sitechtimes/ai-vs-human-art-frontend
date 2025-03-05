import { defineStore } from 'pinia'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND

export const useImageStore = defineStore('image', () => {
  const uploadImage = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    }

    const res = await fetch(`${backendUrl}/items/upload`, requestOptions)
    if (!res.ok) console.error(`HTTP error! status: ${res.status}`)
    return res
  }
  return {
    uploadImage
  }
})
