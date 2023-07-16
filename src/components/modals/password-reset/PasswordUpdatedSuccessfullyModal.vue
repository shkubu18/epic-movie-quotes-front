<template>
  <modal-background modal="passwordUpdatedSuccessfullyModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-20 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-success-bigger />
        <h1 class="text-3xl font-medium mt-7">{{ $t('passwordRecovery.success') }}</h1>
        <p class="mt-7 mb-9">{{ $t('passwordRecovery.your_password_changed_successfully') }}</p>
        <button-base
          @click="toggleModals('passwordUpdatedSuccessfullyModal', 'loginModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('passwordRecovery.login') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import { useModalStore } from '@/stores/useModalStore'
import IconSuccessBigger from '@/components/icons/success/IconSuccessBigger.vue'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>