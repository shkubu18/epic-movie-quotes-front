<template>
  <div
    v-if="modals.emailSentProfileModal"
    @click="toggleModalVisibility('emailSentProfileModal')"
    class="absolute z-50 w-full bg-transparent-dark-blue cursor-pointer flex items-center justify-center"
    :style="`height: ${minHeight}px`"
  ></div>

  <div class="absolute left-1/2 right-1/2 top-1/2 bottom-1/2 flex items-center justify-center z-50">
    <div class="bg-dark-blue mb-12 text-white px-24 py-20 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-email-sent />
        <h1 class="text-3xl font-medium mt-5">{{ $t('texts.check_your_email') }}</h1>
        <p class="mt-7 mb-9">
          {{
            $t('profile.please_check_your_email_and_follow_the_instructions_to_change_your_email')
          }}
        </p>
        <a class="w-full" href="https://mail.google.com/">
          <button-base class="bg-red w-full py-2.5">{{ $t('texts.go_to_my_email') }}</button-base>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconEmailSent from '@/components/icons/IconEmailSent.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'
import { computed } from 'vue'

const modalStore = useModalStore()
const modals = modalStore.modals

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const minHeight = computed(() => {
  return document.body.offsetHeight
})
</script>