<template>
  <login-modal v-if="modals.loginModal" />
  <register-modal v-if="modals.registerModal" />
  <email-sent-modal v-if="modals.emailSentModal" />
  <verification-link-expired-modal v-if="modals.verificationLinkExpiredModal" />
  <already-verified-email-modal v-if="modals.alreadyVerifiedEmailModal" />
  <account-is-activated-modal v-if="modals.accountIsActivatedModal" />
  <spinner-with-background v-if="spinnerStore.isActive" />
  <div class="h-screen bg-gray-950">
    <landing-header />
    <div class="flex items-center justify-center flex-col h-full -mt-24">
      <h1
        class="text-6xl text-yellow text-center font-bold leading-normal mb-6 font-[montserrat-bold]"
      >
        Find any quote in <br />millions of movie lines
      </h1>
      <button-base @click="toggleModalVisibility('loginModal')" class="bg-red text-xl py-2.5">
        Get Started
      </button-base>
    </div>
  </div>
  <landing-quotes />
  <landing-footer />
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import LandingQuotes from '@/components/landing/LandingQuotes.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import { useModalStore } from '@/stores/useModalStore'
import RegisterModal from '@/components/modals/RegisterModal.vue'
import EmailSentModal from '@/components/modals/EmailSentModal.vue'
import VerificationLinkExpiredModal from '@/components/modals/VerificationLinkExpiredModal.vue'
import AlreadyVerifiedEmailModal from '@/components/modals/AlreadyVerifiedEmailModal.vue'
import SpinnerWithBackground from '@/components/shared/SpinnerWithBackground.vue'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import AccountIsActivatedModal from '@/components/modals/AccountIsActivatedModal.vue'

const modalStore = useModalStore()
const modals = modalStore.modals
const spinnerStore = useSpinnerStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>