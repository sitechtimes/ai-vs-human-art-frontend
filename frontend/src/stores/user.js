import { defineStore } from 'pinia'
import { ref } from 'vue'
const BACKEND_URL = import.meta.env.VITE_ADDRESS

export const useUserStore = defineStore('user', () => {
  // state
  const currentUser = ref(null)
  const userId = ref('')
  const accessToken = ref('')
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)

  // requestEndpoitn stealing
  const requestEndpoint = async (method, body) => {
    const options = {}
    if (method) {
      options.method = method
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(body)
      console.log(options)
    }
  }

  // actions
  const register = async (username, email, password) => {
    const request = requestEndpoint('POST', {
      username,
      email,
      password
    })
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, request)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    } catch (error) {
      console.error('Registration Error', error)
    }
  }

  const login = async (email, password) => {
    const request = requestEndpoint('POST', { email, password })

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, request)
      console.log(res)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data = await res.json()
      currentUser.value = data.user
      isAdmin.value = data.user.role === 'admin'
      accessToken.value = data.access_token
      userId.value = data.user._id
      localStorage.setItem('token', accessToken.value)
      localStorage.setItem('userId', userId.value)
    } catch (error) {
      console.error('Login Error', error)
    }
  }

  const auth = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.accessToken}` }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)
      isAuthenticated.value = true
    } catch (error) {
      console.error('authentication problem', error)
      isAuthenticated.value = false
    }
  }

  const logout = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/logout`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      currentUser.value = null
      accessToken.value = ''
      isAuthenticated.value = false
      isAdmin.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    } catch (error) {
      console.error('logout problem', error)
    }
  }

  return {
    currentUser,
    userId,
    accessToken,
    isAuthenticated,
    isAdmin,
    register,
    login,
    auth,
    logout
  }
})
