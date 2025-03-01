import { defineStore } from 'pinia'
const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: localStorage.getItem('user') || '',
      ID: localStorage.getItem('ID') || '',
      userID: localStorage.getItem('userID') || '',
      token: localStorage.getItem('token') || '',
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
      try {
        const res = await fetch(`${backendUrl}/api/auth/register`, requestOptions)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        return data
      } catch (error) {
        console.error('You cannot register at this time.', error.message)
      }
    },
    async getUser(id: string | number) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      try {
        const res = await fetch(`${backendUrl}/api/auth/users/${id}`, requestOptions)
        const data = await res.json()
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return data
      } catch (error) {
        console.error('Problem getting this user', error.message)
      }
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
      try {
        const res = await fetch(`${backendUrl}/api/auth/login`, requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        if (data) {
          this.isAuthenticated = true
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
      } catch (error) {
        console.error('Problem logging in:', error)
      }
    },
    async logout() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
      try {
        const res = await fetch(`${backendUrl}/api/auth/logout`, requestOptions)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        localStorage.removeItem('user')
        this.isAuthenticated = false
        this.token = ''
        this.ID = ''
        this.userID = ''
        localStorage.removeItem('token')
        localStorage.removeItem('ID')
        localStorage.removeItem('userID')
      } catch (error) {
        console.error('Error logging out,', error.message)
      }
    }
  }
})
