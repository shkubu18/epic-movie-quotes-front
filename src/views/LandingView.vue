<template>
  <landing-login-modal v-if="modals.loginModal" />
  <landing-register-modal v-if="modals.registerModal" />
  <landing-email-sent-modal v-if="modals.emailSentModal" />
  <landing-verification-link-expired-modal v-if="modals.verificationLinkExpiredModal" />
  <landing-already-verified-email-modal v-if="modals.alreadyVerifiedEmailModal" />
  <landing-account-is-activated-modal v-if="modals.accountIsActivatedModal" />
  <landing-password-forgot-modal v-if="modals.passwordForgotModal" />
  <landing-password-reset-email-sent-modal v-if="modals.passwordResetEmailSentModal" />
  <landing-password-update-modal v-if="modals.passwordUpdateModal" />
  <landing-password-updated-successfully-modal v-if="modals.passwordUpdatedSuccessfullyModal" />
  <landing-password-reset-token-expired v-if="modals.passwordResetTokenExpiredModal" />
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
import LandingLoginModal from '@/components/landing/LandingLoginModal.vue'
import LandingPasswordForgotModal from '@/components/landing/LandingPasswordForgotModal.vue'
import LandingVerificationLinkExpiredModal from '@/components/landing/LandingVerificationLinkExpiredModal.vue'
import LandingEmailSentModal from '@/components/landing/LandingEmailSentModal.vue'
import LandingRegisterModal from '@/components/landing/LandingRegisterModal.vue'
import LandingPasswordResetEmailSentModal from '@/components/landing/LandingPasswordResetEmailSentModal.vue'
import LandingPasswordUpdateModal from '@/components/landing/LandingPasswordUpdateModal.vue'
import LandingPasswordResetTokenExpired from '@/components/landing/LandingPasswordResetTokenExpired.vue'
import LandingAlreadyVerifiedEmailModal from '@/components/landing/LandingAlreadyVerifiedEmailModal.vue'
import LandingPasswordUpdatedSuccessfullyModal from '@/components/landing/LandingPasswordUpdatedSuccessfullyModal.vue'
import LandingAccountIsActivatedModal from '@/components/landing/LandingAccountIsActivatedModal.vue'
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