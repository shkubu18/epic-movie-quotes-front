import { checkAuthStatus } from '@/services/api/auth'

export const isAuthenticated = (to, from, next) => {
  checkAuthStatus()
    .then((response) => {
      if (response.status === 200) {
        next()
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.clear()
        next({ name: '403' })
      }
    })
}

export const isNotAuthenticated = (to, from, next) => {
  checkAuthStatus()
    .then((response) => {
      if (response.status === 200) {
        next({ name: 'newsfeed' })
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.clear()
        next()
      }
    })
}
