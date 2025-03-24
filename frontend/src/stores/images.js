import { defineStore } from 'pinia'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND

export const useImageStore = defineStore('image', () => {
  const uploadImage = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const res = await fetch(`${backendUrl}/items/upload`, requestOptions)
    if (!res.ok) console.error(`HTTP error! status: ${res.status}`)
    return res
  }
  return {
    uploadImage
  }
})
