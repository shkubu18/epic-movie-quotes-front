<template>
  <modal-background modal="verificationLinkExpiredModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-16 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">Link expired!</h1>
        <p class="mt-7 mb-9">Email verification link has expired, because you haven’t used it</p>
        <button-base @click="resendEmail" class="bg-red w-full py-2.5"
          >Request another link
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { resendEmailForVerification } from '@/services/api/auth'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import { useModalStore } from '@/stores/useModalStore'
import { useEmailToBeVerifiedStore } from '@/stores/useEmailToBeVerifiedStore'

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
</script>