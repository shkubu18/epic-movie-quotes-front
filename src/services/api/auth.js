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

export async function logout() {
  return axios.get('/api/logout')
}

export async function register(username, email, password, passwordConfirmation) {
  return axios.post('/api/register', {
    username: username,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation
  })
}

export async function verifyEmail(token) {
  return axios.get(`api/email/verify/${token}`)
}

export async function updateEmail(token) {
  return axios.get(`api/email/update/${token}`)
}

export async function resendEmailForVerification(email) {
  return axios.post('/api/email/resend/verify-email', {
    email: email
  })
}

export async function sendPasswordForgotEmail(email) {
  return axios.post('api/password/email', {
    email: email
  })
}

export async function passwordUpdate(password, passwordConfirmation, token) {
  return axios.post('api/password/update', {
    password: password,
    password_confirmation: passwordConfirmation,
    token: token
  })
}

export async function checkAuthStatus() {
  return axios.get('api/authenticated')
}
