import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  // state
  const currentUser =
    localStorage.getItem('currentUser') !== null ? localStorage.getItem('currentUser') : ref('')
  const Id = localStorage.getItem('Id') !== null ? localStorage.getItem('Id') : ref('')
  const userid = localStorage.getItem('userID') !== null ? localStorage.getItem('userID') : ref('')
  const token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : ref('')
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
    const res = await fetch('http://localhost:3000/api/auth/register', requestOptions)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    // console.log('success!! registered')
  }
  const getUser = async (id: Number) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const res = await fetch(`http://localhost:3000/api/auth/users/${id}`, requestOptions)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return res
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
    const res = await fetch('http://localhost:3000/api/auth/login', requestOptions)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    localStorage.setItem('currentUser', data)
    localStorage.setItem('token', data.user.refresh_token)
    localStorage.setItem('Id', data.user._id)
    localStorage.setItem('userID', data.user.userid)
    return data
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
    const res = await fetch('http://localhost:3000/api/auth/logout', requestOptions)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    localStorage.setItem('currentUser', data)
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('Id')
    localStorage.removeItem('userid')
  }
  return {
    currentUser,
    Id,
    userid,
    token,
    isAuthenticated,
    isAdmin,
    register,
    login,
    auth,
    logout,
    getUser
  }
})
