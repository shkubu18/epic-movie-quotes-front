<template>
  <modal-background modal="passwordResetEmailSentModal" />
  <modal-container>
    <div
      class="bg-lighter-black md:bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-14 rounded-lg text-center"
    >
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent p-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('passwordResetEmailSentModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
        <icon-email-sent />
        <h1 class="text-3xl font-medium mt-5">{{ $t('texts.check_your_email') }}</h1>
        <p class="mt-7 mb-9 md:px-7">
          {{ $t('passwordRecovery.we_have_sent_password_recover_instructions_to_your_email') }}
        </p>

        <a class="w-full" href="https://mail.google.com/">
          <button-base class="bg-red w-full py-2.5">{{ $t('texts.go_to_my_email') }}</button-base>
        </a>
        <span
          class="text-gray-600 mt-10 cursor-pointer"
          @click="toggleModalVisibility('passwordResetEmailSentModal')"
        >
          {{ $t('passwordRecovery.skip_i_will_confirm_later') }}
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
import IconModalClose from '@/components/icons/IconModalClose.vue'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>