<template>
  <modal-background modal="emailSentModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-20 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-email-sent />
        <h1 class="text-3xl font-medium mt-5">{{ $t('texts.thank_you') }}</h1>
        <p class="mt-7 mb-9">
          {{ $t('auth.please_check_your_email_to_activate_your_account') }}
        </p>
        <a class="w-full" href="https://mail.google.com/">
          <button-base class="bg-red w-full py-2.5">{{ $t('texts.go_to_my_email') }}</button-base>
        </a>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconEmailSent from '@/components/icons/IconEmailSent.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>