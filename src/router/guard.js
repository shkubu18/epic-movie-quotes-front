import { checkAuthStatus } from '@/services/api/auth'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

export const shouldAuthenticated = (to, from, next) => {
  const userStore = useUserStore()
  const { isUserAlreadyFetched } = storeToRefs(userStore)

  if (isUserAlreadyFetched.value) {
    next()
  } else {
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
}

export const shouldNotAuthenticated = (to, from, next) => {
  const userStore = useUserStore()
  const { isUserAlreadyFetched } = storeToRefs(userStore)

  if (isUserAlreadyFetched.value) {
    next()
  } else {
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
}
