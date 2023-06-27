import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpinnerStore = defineStore('useSpinnerStore', () => {
  const isActive = ref(false)

  const toggleActiveStatus = () => {
    isActive.value = !isActive.value
  }

  return {
    isActive,
    toggleActiveStatus
  }
})
