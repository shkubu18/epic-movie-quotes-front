import axios from '@/plugins/axios/axios'

export async function changeLanguage(language) {
  return axios.get(`/api/locale/${language}`)
}

export async function getLocale() {
  return axios.get('/api/locale')
}
