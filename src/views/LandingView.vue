<template>
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
  <div class="h-600 md:h-810 bg-black">
    <landing-header />
    <div class="flex items-center justify-center flex-col h-full -mt-14 md:-mt-24">
      <h1
        :class="{
          'text-2xl md:text-6xl w-3/4 text-yellow text-center font-bold !leading-normal mb-6 font-[montserrat-bold]': true,
          'md:w-2/5': $i18n.locale === 'en',
          'md:w-3/5': $i18n.locale === 'ka'
        }"
      >
        {{ $t('landing.find_any_quote_in_millions_of_movie_lines') }}
      </h1>
      <button-base
        @click="toggleModalVisibility('loginModal')"
        class="bg-red text-base md:text-xl py-2.5"
      >
        {{ $t('texts.get_started') }}
      </button-base>
    </div>
  </div>
  <landing-quotes />
  <footer-copyright />
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import LandingQuotes from '@/components/landing/LandingQuotes.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import FooterCopyright from '@/components/shared/FooterCopyright.vue'
import SpinnerWithBackground from '@/components/shared/SpinnerWithBackground.vue'
import LoginModal from '@/components/modals/auth/LoginModal.vue'
import PasswordForgotModal from '@/components/modals/password-reset/PasswordForgotModal.vue'
import VerificationLinkExpiredModal from '@/components/modals/auth/VerificationLinkExpiredModal.vue'
import EmailSentModal from '@/components/modals/emails/EmailSentModal.vue'
import RegisterModal from '@/components/modals/auth/RegisterModal.vue'
import PasswordResetEmailSentModal from '@/components/modals/password-reset/passwordResetEmailSentModal.vue'
import PasswordUpdateModal from '@/components/modals/password-reset/PasswordUpdateModal.vue'
import PasswordResetTokenExpired from '@/components/modals/password-reset/PasswordResetTokenExpired.vue'
import AlreadyVerifiedEmailModal from '@/components/modals/auth/AlreadyVerifiedEmailModal.vue'
import PasswordUpdatedSuccessfullyModal from '@/components/modals/password-reset/PasswordUpdatedSuccessfullyModal.vue'
import AccountIsActivatedModal from '@/components/modals/auth/AccountIsActivatedModal.vue'
import { useModalStore } from '@/stores/useModalStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import { storeToRefs } from 'pinia'

const route = useRoute()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)
const spinnerStore = useSpinnerStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

onMounted(() => {
  if (route.query.token) {
    modalStore.toggleModalVisibility('passwordUpdateModal')
  }
})
</script>