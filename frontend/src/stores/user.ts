import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const currentUser = ref(null)
  const Id = ref('')
  const userid = ref('')
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
    currentUser.value = data
    token.value = data.user.refresh_token
    Id.value = data.user._id
    userid.value = data.user.userid
    console.log()
    localStorage.setItem('token', token.value)
    localStorage.setItem('Id', Id.value)
    localStorage.setItem('userID', userid.value)
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
    currentUser.value = data.user
    token.value = data.refreshToken
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('Id')
    localStorage.removeItem('userid')
  }
  /* watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
  ) */
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
