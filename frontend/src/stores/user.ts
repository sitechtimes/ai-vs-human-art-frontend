import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    currentUser: null,
    userId: '',
    token: '',
    isAuthenticated: false,
    isAdmin: false
  }),
  actions: {
    async register(username: null, email: null, password: null, passwordConfirm: null) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password_confirm: passwordConfirm
        })
      }
      try {
        const res = await fetch('http://localhost:3000/routes/api/auth/register', requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        console.log('success!! registered')
      } catch (error) {
        console.error('registration problem', error)
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
        this.token = data.refreshToken
        this.userId = data.user.id
        localStorage.setItem('token', this.token)
        localStorage.setItem('userId', this.userId)
        console.log('success!! logged in')
      } catch (error) {
        console.error('login problem', error)
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
        console.error('authentication problem', error)
        this.isAuthenticated = false
      }
    },
    async logout() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'appliation/json' }
      }
      try {
        const res = await fetch('http://localhost:3000/api/logout', requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        this.currentUser = data.user
        this.token = data.refreshToken
        this.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
      } catch (error) {
        console.error('logout problem', error)
      }
    }
  }
})
