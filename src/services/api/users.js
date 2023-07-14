import axios from '@/plugins/axios/axios'

export async function getUser() {
  return axios.get('api/users/user')
}

export async function updateUser(data, userId) {
  return axios.post(`/api/users/${userId}`, data)
}
