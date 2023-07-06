import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('useModalStore', () => {
  const modals = ref({
    loginModal: false,
    registerModal: false,
    emailSentModal: false,
    verificationLinkExpiredModal: false,
    alreadyVerifiedEmailModal: false,
    accountIsActivatedModal: false,
    passwordForgotModal: false,
    passwordResetEmailSentModal: false,
    passwordUpdateModal: false,
    passwordUpdatedSuccessfullyModal: false,
    passwordResetTokenExpiredModal: false,
    movieAddModal: false,
    movieEditModal: false
  })

  const toggleModalVisibility = (modalName) => {
    if (modals.value[modalName] !== undefined) {
      modals.value[modalName] = !modals.value[modalName]
    }
  }

  return {
    modals,
    toggleModalVisibility
  }
})
