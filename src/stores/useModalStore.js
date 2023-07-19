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
    movieEditModal: false,
    quoteAddModal: false,
    quoteEditModal: false,
    quoteViewModal: false,
    quoteViewFromNotificationModal: false,
    userUpdateEmailSentModal: false,
    userUpdateModal: false,
    mobileMenuModal: false,
    mobileNewsFeedSearchModal: false,
    mobileProfileNewUsernameModal: false,
    mobileProfileNewEmailModal: false,
    mobileProfileNewPasswordModal: false,
    mobileProfileAskConfirmationModal: false,
    notificationModal: false
  })

  const toggleModalVisibility = (modalName) => {
    if (modals.value[modalName] !== undefined) {
      modals.value[modalName] = !modals.value[modalName]
    }
  }

  const closeActiveModal = () => {
    for (const modal in modals.value) {
      if (modals.value[modal] === true) {
        modals.value[modal] = false
      }
    }
  }

  return {
    modals,
    toggleModalVisibility,
    closeActiveModal
  }
})
