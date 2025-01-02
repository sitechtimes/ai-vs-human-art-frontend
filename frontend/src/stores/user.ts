import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    Id: null,
    userid: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false
  }),
  actions: {
    register: async (username: string, email: string, password: string) => {
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
    getUser: async (id: Number) => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await fetch(`http://localhost:3000/api/auth/users/${id}`, requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return res
    },
    login: async (email: string, password: string) => {
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
      this.user = data
      this.token = data.user.refresh_token
      this.Id = data.user._id
      this.userID = data.user.userid
      return data
    },

    auth: async () => {
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

    logout: async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await fetch('http://localhost:3000/api/auth/logout', requestOptions)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      localStorage.setItem('currentUser', data)
      this.isAuthenticated = false
      this.token = null
      this.Id = null
      this.userid = null
    }
  }
})
