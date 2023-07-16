<template>
  <modal-background modal="verificationLinkExpiredModal" />
  <modal-container>
    <div
      class="bg-lighter-black md:bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-16 rounded-lg text-center"
    >
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent py-12 px-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('verificationLinkExpiredModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">{{ $t('auth.link_expired_short_text') }}</h1>
        <p class="mt-7 mb-9">{{ $t('auth.link_expired_long_text') }}</p>
        <button-base @click="resendEmail" class="bg-red w-full py-2.5">
          {{ $t('auth.request_another_link') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { resendEmailForVerification } from '@/services/api/auth'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import { useModalStore } from '@/stores/useModalStore'
import { useEmailToBeVerifiedStore } from '@/stores/useEmailToBeVerifiedStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'

const emailToBeVerifiedStore = useEmailToBeVerifiedStore()

const spinnerStore = useSpinnerStore()
const modalStore = useModalStore()

async function resendEmail() {
  spinnerStore.toggleActiveStatus()
  await resendEmailForVerification(emailToBeVerifiedStore.email)
  spinnerStore.toggleActiveStatus()

  modalStore.toggleModalVisibility('verificationLinkExpiredModal')
  modalStore.toggleModalVisibility('checkEmailModal')
}

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>