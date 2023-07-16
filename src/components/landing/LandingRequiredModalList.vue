<template>
  <div>
    <login-modal v-if="modals.loginModal" />
    <register-modal v-if="modals.registerModal" />
    <email-sent-modal v-if="modals.emailSentModal" />
    <verification-link-expired-modal v-if="modals.verificationLinkExpiredModal" />
    <already-verified-email-modal v-if="modals.alreadyVerifiedEmailModal" />
    <account-is-activated-modal v-if="modals.accountIsActivatedModal" />
    <password-forgot-modal v-if="modals.passwordForgotModal" />
    <password-reset-email-sent-modal v-if="modals.passwordResetEmailSentModal" />
    <password-update-modal v-if="modals.passwordUpdateModal" />
    <password-updated-successfully-modal v-if="modals.passwordUpdatedSuccessfullyModal" />
    <password-reset-token-expired v-if="modals.passwordResetTokenExpiredModal" />
    <spinner-with-background v-if="spinnerStore.isActive" />
  </div>
</template>
<script setup>
import PasswordResetTokenExpired from '@/components/modals/password-reset/PasswordResetTokenExpired.vue'
import PasswordForgotModal from '@/components/modals/password-reset/PasswordForgotModal.vue'
import VerificationLinkExpiredModal from '@/components/modals/auth/VerificationLinkExpiredModal.vue'
import AlreadyVerifiedEmailModal from '@/components/modals/auth/AlreadyVerifiedEmailModal.vue'
import AccountIsActivatedModal from '@/components/modals/auth/AccountIsActivatedModal.vue'
import PasswordUpdateModal from '@/components/modals/password-reset/PasswordUpdateModal.vue'
import RegisterModal from '@/components/modals/auth/RegisterModal.vue'
import SpinnerWithBackground from '@/components/shared/SpinnerWithBackground.vue'
import PasswordUpdatedSuccessfullyModal from '@/components/modals/password-reset/PasswordUpdatedSuccessfullyModal.vue'
import EmailSentModal from '@/components/modals/emails/EmailSentModal.vue'
import PasswordResetEmailSentModal from '@/components/modals/password-reset/passwordResetEmailSentModal.vue'
import LoginModal from '@/components/modals/auth/LoginModal.vue'
import { useModalStore } from '@/stores/useModalStore'
import { useSpinnerStore } from '@/stores/useSpinnerStore'

const modalStore = useModalStore()
const modals = modalStore.modals
const spinnerStore = useSpinnerStore()
</script>