import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export const register = (payload)=> api.post('/users/register', payload)
export const login = (payload)=> api.post('/users/login', payload)
export const sendSupport = (payload)=> api.post('/support', payload)

export default api