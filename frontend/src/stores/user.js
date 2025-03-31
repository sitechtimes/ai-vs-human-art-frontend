import { defineStore } from 'pinia'
import { ref } from 'vue'

const BACKEND_URL = import.meta.env.VITE_ADDRESS

export const useUserStore = defineStore('user', () => {
  // state
  const currentUser = ref(null)
  const userId = ref('')
  const token = ref('')
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)
  const highScore = ref(0)

  // actions
  const register = async (username, email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    } catch (error) {
      console.error('Registration Error', error)
      // gonna have to do more than console log this later
    }
  }

  const login = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      currentUser.value = data.user
      if (data.user.role == 'admin') {
        isAdmin.value = true
      }

      highScore.value = data.highscore
      token.value = data.access_token
      userId.value = data.user._id
      localStorage.setItem('token', token.value)
      localStorage.setItem('userId', userId.value)
    } catch (error) {
      console.error('Login Error', error)
    }
  }

  const auth = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.token}` }
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
      token.value = ''
      isAuthenticated.value = false
      isAdmin.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    } catch (error) {
      console.error('logout problem', error)
    }
  }

  const updateHighScore = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({
          newHighScore: highScore,
          userId: userId
        })
      }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/highscore`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    } catch (error) {
      console.error('highscore update problem', error)
    }
  }

  return {
    currentUser,
    userId,
    token,
    isAuthenticated,
    isAdmin,
    highScore,
    register,
    login,
    auth,
    logout,
    updateHighScore
  }
})
