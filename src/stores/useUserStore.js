import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const user = ref({})

  function addUser(userInfo) {
    user.value = userInfo
  }

  return {
    user,
    addUser
  }
})
