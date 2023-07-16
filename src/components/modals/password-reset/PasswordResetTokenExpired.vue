<template>
  <modal-background modal="passwordResetTokenExpiredModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-16 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">
          {{ $t('passwordRecovery.password_token_expired_short_text') }}
        </h1>
        <p class="mt-7 mb-9">{{ $t('passwordRecovery.password_token_expired_long_text') }}</p>
        <button-base
          @click="toggleModals('passwordResetTokenExpiredModal', 'passwordForgotModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('passwordRecovery.reset_password_again') }}
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
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

function toggleModals(closingModal, openingModal) {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>