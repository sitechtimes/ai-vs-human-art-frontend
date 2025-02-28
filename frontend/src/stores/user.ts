import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: localStorage.getItem('user') !== null ? localStorage.getItem('user') : ref(''),
      ID: localStorage.getItem('ID') !== null ? localStorage.getItem('Id') : ref(''),
      userID: localStorage.getItem('userID') !== null ? localStorage.getItem('userID') : ref(''),
      token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : ref(''),
      isAuthenticated: false,
      isAdmin: false
    }
  },
  actions: {
    async register(username: string, email: string, password: string) {
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
    },
    async getUser(ID: Number) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await fetch(`http://localhost:3000/api/auth/users/${ID}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      return data
    },
    async login(email: string, password: string) {
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
      console.log(data)
      if (data) {
        this.user = data
        this.token = data.user.refresh_token
        this.ID = data.user._ID
        this.userID = data.user.userID
        localStorage.setItem('user', data)
        localStorage.setItem('token', data.user.refresh_token)
        localStorage.setItem('ID', data.user._id)
        localStorage.setItem('userID', data.user.userid)
      }
      return data
    },

    async auth() {
      const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
      try {
        const res = await fetch('http://localhost:3000/api/auth', requestOptions)
        if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)
        this.isAuthenticated = true
      } catch (error) {
        console.error('authentication problem', error)
        this.isAuthenticated = false
      }
    },

    async logout() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await fetch('http://localhost:3000/api/auth/logout', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      console.log(res)
      localStorage.removeItem('user')
      this.isAuthenticated = false
      this.token = null
      this.ID = null
      this.userID = null
=======
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
      const res = await fetch('http://localhost:8000/api/auth/login', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      currentUser.value = data.user
      if (data.user.role == 'admin') {
        isAdmin.value = true
      }
      // token.value = data.user.refresh_token
      token.value = data.access_token
      userId.value = data.user._id
      // console.log('well noting for now')
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
      const res = await fetch('http://localhost:8000/api/auth', requestOptions)
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
      const res = await fetch('http://localhost:8000/api/auth/logout', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      currentUser.value = null
      token.value = ''
      isAuthenticated.value = false
      isAdmin.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('ID')
      localStorage.removeItem('userID')
    }
  }
})
