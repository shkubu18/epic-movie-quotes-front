<template>
  <div
    v-if="modals.emailSentProfileModal"
    @click="toggleModalVisibility('emailSentProfileModal')"
    class="absolute z-40 w-full bg-transparent-dark-blue cursor-pointer flex items-center justify-center"
    :style="`height: ${minHeight}px`"
  ></div>

  <div
    class="w-full md:w-0 absolute md:left-1/2 md:right-1/2 md:top-1/2 md:bottom-1/2 flex items-center justify-center z-50"
  >
    <div class="bg-dark-blue mb-12 text-white px-5 lg:px-24 py-20 rounded-lg text-center">
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent py-20 px-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('emailSentProfileModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
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
import IconModalClose from '@/components/icons/IconModalClose.vue'

const modalStore = useModalStore()
const modals = modalStore.modals

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const minHeight = computed(() => {
  return document.body.offsetHeight
})
</script>