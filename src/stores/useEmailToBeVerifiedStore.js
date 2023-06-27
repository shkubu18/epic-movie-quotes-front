import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmailToBeVerifiedStore = defineStore('useEmailToBeVerifiedStore', () => {
  const email = ref('')

  return {
    email
  }
})
