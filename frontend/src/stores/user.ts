import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const currentUser = ref(null)
  const userId = ref('')
  const token = ref('')
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)

  // actions
  const register = async (username: string, email: string, password: string) => {
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
      const res = await fetch('http://localhost:3000/api/auth/register', requestOptions)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      // console.log('success!! registered')
    } catch (error) {
      console.error('Registration Error', error)
      // gonna have to do more than console log this later
    }
  }

  const login = async (email: string, password: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      currentUser.value = data.user
      // token.value = data.user.refresh_token
      token.value = data.access_token
      userId.value = data.user._id
      localStorage.setItem('token', token.value)
      localStorage.setItem('userId', userId.value)
      // console.log('success!! logged in')
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
      const res = await fetch('http://localhost:3000/api/auth', requestOptions)
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
      const res = await fetch('http://localhost:3000/api/auth/logout', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      currentUser.value = null
      token.value = ''
      isAuthenticated.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    } catch (error) {
      console.error('logout problem', error)
    }
  }

  return {
    currentUser,
    userId,
    token,
    isAuthenticated,
    isAdmin,
    register,
    login,
    auth,
    logout
  }
})
