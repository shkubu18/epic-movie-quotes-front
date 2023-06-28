<template>
  <modal-background modal="passwordResetEmailSentModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-14 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-email-sent />
        <h1 class="text-3xl font-medium mt-5">Check your email</h1>
        <p class="mt-7 mb-9">We have sent a password recover instructions to your email</p>
        <a class="w-full" href="https://mail.google.com/">
          <button-base class="bg-red w-full py-2.5">Go to my email</button-base>
        </a>
        <span
          class="block text-gray-600 mt-10 flex items-center cursor-pointer"
          @click="toggleModalVisibility('passwordResetEmailSentModal')"
        >
          Skip, I’ll confirm later
        </span>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconEmailSent from '@/components/icons/IconEmailSent.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>