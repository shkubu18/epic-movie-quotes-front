import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const user = ref({})
  const isUserAlreadyFetched = ref(false)

  function addUser(userInfo) {
    user.value = userInfo
  }

  function resetStore() {
    user.value = {}
    isUserAlreadyFetched.value = false
  }

  return {
    user,
    addUser,
    isUserAlreadyFetched,
    resetStore
  }
})
