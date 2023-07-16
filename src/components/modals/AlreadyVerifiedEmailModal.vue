<template>
  <modal-background modal="alreadyVerifiedEmailModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-16 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">{{ $t('auth.already_verified') }}</h1>
        <p class="mt-7 mb-9">{{ $t('auth.your_email_is_already_verified') }}</p>
        <button-base
          @click="toggleModals('alreadyVerifiedEmailModal', 'loginModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('auth.login') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>