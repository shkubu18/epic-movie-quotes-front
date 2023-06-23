import axios from '@/plugins/axios/axios'

export async function setCookies() {
  return axios.get('/sanctum/csrf-cookie')
}

export async function login(usernameOrEmail, password, remember) {
  const data = {
    username_or_email: usernameOrEmail,
    password: password
  }

  if (remember === true) data['remember'] = remember

  return axios.post('/api/login', data)
}
