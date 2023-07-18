<template>
  <landing-modal-login v-if="modals.loginModal" />
  <landing-modal-register v-if="modals.registerModal" />
  <landing-modal-email-sent v-if="modals.emailSentModal" />
  <landing-modal-verification-link-expired v-if="modals.verificationLinkExpiredModal" />
  <landing-modal-already-verified-email v-if="modals.alreadyVerifiedEmailModal" />
  <landing-modal-account-is-activated v-if="modals.accountIsActivatedModal" />
  <landing-modal-password-forgot v-if="modals.passwordForgotModal" />
  <landing-modal-password-reset-email-sent v-if="modals.passwordResetEmailSentModal" />
  <landing-modal-password-update v-if="modals.passwordUpdateModal" />
  <landing-modal-password-updated-successfully v-if="modals.passwordUpdatedSuccessfullyModal" />
  <landing-modal-password-reset-token-expired v-if="modals.passwordResetTokenExpiredModal" />
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
import LandingModalLogin from '@/components/landing/LandingModalLogin.vue'
import LandingModalPasswordForgot from '@/components/landing/LandingModalPasswordForgot.vue'
import LandingModalVerificationLinkExpired from '@/components/landing/LandingModalVerificationLinkExpired.vue'
import LandingModalEmailSent from '@/components/landing/LandingModalEmailSent.vue'
import LandingModalRegister from '@/components/landing/LandingModalRegister.vue'
import LandingModalPasswordResetEmailSent from '@/components/landing/LandingModalPasswordResetEmailSent.vue'
import LandingModalPasswordUpdate from '@/components/landing/LandingModalPasswordUpdate.vue'
import LandingModalPasswordResetTokenExpired from '@/components/landing/LandingModalPasswordResetTokenExpired.vue'
import LandingModalAlreadyVerifiedEmail from '@/components/landing/LandingModalAlreadyVerifiedEmail.vue'
import LandingModalPasswordUpdatedSuccessfully from '@/components/landing/LandingModalPasswordUpdatedSuccessfully.vue'
import LandingModalAccountIsActivated from '@/components/landing/LandingModalAccountIsActivated.vue'
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