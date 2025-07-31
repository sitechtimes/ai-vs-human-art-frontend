import { defineStore } from 'pinia'
import { ref } from 'vue'
const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND

export const useUserStore = defineStore('user', () => {
  // state
  const currentUser = ref(null)
  const userId = ref('')
  const accessToken = ref('')
  const isAuthenticated = ref(false)
  const isAdmin = ref(false)

  // requestEndpoitn stealing
  const requestEndpoint = async (endpoint, method, body, credentials) => {
    const options = {}
    if (method) {
      options.method = method
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(body)
    }
    if (credentials) {
      options.credentials = credentials // include, same-origin, *omit -- include for login cookies
    }
    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, options)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return await res.json()
    } catch (error) {
      console.error(error)
    }
  }

  // actions
  const register = async (username, email, password) => {
    await requestEndpoint('/api/auth/register', 'POST', {
      username,
      email,
      password
    })
  }

  const login = async (email, password) => {
    const data = await requestEndpoint('/api/auth/login', 'POST', { email, password }, 'include')
    currentUser.value = data.user
    isAdmin.value = data.user.role === 'admin'
    accessToken.value = data.access_token
    userId.value = data.user._id
    localStorage.setItem('isAdmin', isAdmin.value)
    localStorage.setItem('userId', userId.value)
  }

  const auth = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken.value}` }
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)
      isAuthenticated.value = true
      //localStorage.setItem('auth', isAuthenticated.value)
    } catch (error) {
      console.error('authentication problem', error)
      isAuthenticated.value = false
    }
  }

  const validateToken = async () => {
    const res = await requestEndpoint(
      '/api/auth/validate',
      'POST',
      {
        accessToken: accessToken.value
      },
      'include'
    )

    currentUser.value = res.user
  }

  const refresh = async () => {
    try {
      const ping = await requestEndpoint('/api/auth/cookieping', 'POST', {}, 'include')
      if (ping.authenticated) {
        const res = await requestEndpoint('/api/auth/refresh', 'POST', {}, 'include')
        accessToken.value = res.accessToken
        validateToken(accessToken.value)
        userId.value = localStorage.getItem('userId')
        //isAuthenticated.value = localStorage.getItem('auth')
        isAdmin.value = localStorage.getItem('isAdmin')
        return true
      } else {
        throw new Error('No refresh token cookie found')
      }
    } catch (error) {
      //console.log('Token refresh problem: ', error)
      if (currentUser.value) await logout()
      accessToken.value = ''
      localStorage.removeItem('userId')
      localStorage.removeItem('isAdmin')
      //localStorage.removeItem('auth')
      return false
    }
  }

  const logout = async () => {
    const res = await requestEndpoint('/api/auth/logout', 'POST', {}, 'include') //include cookies to logout with
    if (!res.message) throw new Error(`HTTP error! status: ${res.status}`)
    currentUser.value = null
    accessToken.value = ''
    isAuthenticated.value = false
    isAdmin.value = false
    localStorage.removeItem('userId')
    localStorage.removeItem('isAdmin')
    //localStorage.removeItem('auth')
  }

  const updateHighScore = async (highScore, userId) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newHighScore: highScore,
        userId: userId
      })
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
    accessToken,
    isAuthenticated,
    isAdmin,
    register,
    login,
    auth,
    logout,
    updateHighScore,
    refresh,
    validateToken
  }
})
