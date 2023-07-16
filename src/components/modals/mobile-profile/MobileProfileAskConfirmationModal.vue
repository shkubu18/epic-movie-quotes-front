<template>
  <teleport to="body">
    <spinner-with-background v-if="spinnerStore.isActive" />
  </teleport>

  <div
    class="lg:hidden absolute top-0 z-20 w-full min-h-screen bg-transparent-black px-5"
    :style="`height: ${minHeight}px`"
  >
    <div class="bg-dark-blue mt-24 rounded-lg">
      <div class="pt-16 pb-12 text-white text-center border-b border-b-default-border-b-color">
        <h3 class="px-5">{{ $t('profile.are_you_sure_to_make_changes') }}</h3>
        <div v-if="serverErrorMessage">
          <span class="text-red mt-3 block">
            {{ serverErrorMessage }} {{ $t('profile.click_cancel_and_try_different_one') }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between px-5 py-3.5">
        <button-base @click="toggleModalVisibility('mobileProfileAskConfirmationModal')">
          {{ $t('texts.cancel') }}
        </button-base>
        <button-base @click="handleClick" class="bg-red py-3"
          >{{ $t('profile.confirm') }}
        </button-base>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import SpinnerWithBackground from '@/components/shared/SpinnerWithBackground.vue'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import { updateUser } from '@/services/api/users'

const props = defineProps({
  values: {
    required: true,
    type: Object
  }
})

const spinnerStore = useSpinnerStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isUserAlreadyFetched } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)
const { toggleModalVisibility } = modalStore

const minHeight = computed(() => {
  return document.body.offsetHeight
})

const serverErrorMessage = ref('')

const handleClick = async () => {
  if (props.values.email) spinnerStore.toggleActiveStatus()
  await updateUser(props.values, user.value.id)
    .then((response) => {
      if (response.status === 200) {
        isUserAlreadyFetched.value = false
        modalStore.closeActiveModal()

        if (response.data.message === 'verification email sent successfully') {
          spinnerStore.toggleActiveStatus()

          modalStore.toggleModalVisibility('emailSentProfileModal')
        } else {
          modalStore.toggleModalVisibility('userUpdateModal')
        }
      }
    })
    .catch((error) => {
      serverErrorMessage.value = error.response.data.message
      if (spinnerStore.isActive) {
        spinnerStore.toggleActiveStatus()
      }
    })

  setTimeout(() => {
    if (modals.value.userUpdateModal) {
      modalStore.toggleModalVisibility('userUpdateModal')
    }
  }, 4000)
}
</script>