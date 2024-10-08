import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    currentUser: null,
    userId: '',
    token: '',
    isAuthenticated: false
  }),
  actions: {
    async register(username: null, email: null, password: null) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, email: email, password: password })
      }
      try {
        const res = await fetch('http://localhost:3000/register', requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        console.log('success!! registered')
      } catch (error) {
        console.error('problem', error)
      }
    },
    async login(username: null, password: null) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
      try {
        const res = await fetch('http://localhost:3000/login', requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        this.currentUser = data.user
        this.token = data.refresh_token
        this.userId = data.user._id
        localStorage.setItem('token', this.token)
        localStorage.setItem('userId', this.userId)
        console.log('success!! logged in')
      } catch (error) {
        console.error('problem', error)
      }
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
        console.error('problem', error)
        this.isAuthenticated = false
      }
    },
    logout() {
      this.currentUser = null
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
})
