<template>
  <modal-background modal="passwordUpdateModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-10 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <h1 class="text-3xl font-medium mt-3">{{ $t('passwordRecovery.create_new_password') }}</h1>
        <p class="mt-3 mb-9 text-gray-600 px-5">
          {{ $t('passwordRecovery.your_new_password_must_be_different_from_previous_passwords') }}
        </p>
        <form-password-update />
        <span
          class="text-gray-600 mt-10 flex items-center cursor-pointer"
          @click="handleClick('passwordUpdateModal', 'loginModal')"
        >
          <icon-arrow-left class="mr-3" />
          {{ $t('passwordRecovery.back_to_login') }}
        </span>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconArrowLeft from '@/components/icons/arrows/IconArrowLeft.vue'
import { useModalStore } from '@/stores/useModalStore'
import FormPasswordUpdate from '@/components/forms/FormPasswordUpdate.vue'

const modalStore = useModalStore()

const handleClick = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>