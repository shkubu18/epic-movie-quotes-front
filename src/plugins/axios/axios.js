import axios from 'axios'

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  },
  mode: 'no-cors'
})

export default defaultInstance
