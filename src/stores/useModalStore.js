import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('useModalStore', () => {
  const modals = ref({
    loginModal: false
  })

  const toggleModalVisibility = (modalName) => {
    if (modals.value[modalName] !== undefined) {
      modals.value[modalName] = !modals.value[modalName]

      if (modals.value[modalName]) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }

  return {
    modals,
    toggleModalVisibility
  }
})
