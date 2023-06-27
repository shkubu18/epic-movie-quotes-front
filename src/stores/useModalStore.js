import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('useModalStore', () => {
  const modals = ref({
    loginModal: false,
    registerModal: false,
    emailSentModal: false,
    verificationLinkExpiredModal: false,
    alreadyVerifiedEmailModal: false,
    accountIsActivatedModal: false
  })

  const toggleModalVisibility = (modalName) => {
    if (modals.value[modalName] !== undefined) {
      modals.value[modalName] = !modals.value[modalName]

      if (modals.value[modalName]) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.removeAttribute('class')
      }
    }
  }

  return {
    modals,
    toggleModalVisibility
  }
})
