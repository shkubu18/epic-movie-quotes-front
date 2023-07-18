import axios from '@/plugins/axios/axios'

export async function authWithGoogle() {
  return axios.get('/sanctum/csrf-cookie').then(() => {
    location.href = import.meta.env.VITE_API_BASE_URL + '/api/oauth/google/redirect'
  })
}
