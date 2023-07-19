<template>
  <teleport to="body">
    <mobile-modal-profile-new-username v-if="modals.mobileProfileNewUsernameModal" />
    <mobile-modal-profile-new-email v-if="modals.mobileProfileNewEmailModal" />
    <mobile-modal-profile-new-password v-if="modals.mobileProfileNewPasswordModal" />
  </teleport>

  <ValidationForm
    v-slot="{ errors, handleSubmit }"
    as="div"
    :class="{
      'w-full px-5 lg:px-0': true,
      'lg:w-3/5': $i18n.locale === 'en',
      'lg:w-full lg:px-36': $i18n.locale === 'ka'
    }"
  >
    <form @submit="handleSubmit($event, onSubmit)" id="profile-form">
      <input-profile
        :input-value="user.username"
        :label="$t('profile.labels.username')"
        type="text"
        @edit-button-clicked="toggleInputVisibility('newUsername', 'mobileProfileNewUsernameModal')"
      />
      <input-profile-update
        v-model="newUsername"
        :error="errors.username ? errors.username : ''"
        :is-input-visible="isInputVisible('newUsername')"
        :label="$t('profile.labels.new_username')"
        name="username"
        :placeholder="$t('profile.enter_new_input', { input: $t('profile.inputs.username') })"
        rules="min-3-max-15-lowercase"
        type="text"
      />

      <input-profile
        :google-user="!!user.google_id"
        :input-value="user.email"
        :label="$t('profile.labels.email')"
        type="text"
        @edit-button-clicked="toggleInputVisibility('newEmail', 'mobileProfileNewEmailModal')"
      />
      <input-profile-update
        v-model="newEmail"
        :error="errors.email ? errors.email : ''"
        :is-input-visible="isInputVisible('newEmail')"
        :label="$t('profile.labels.new_email')"
        name="email"
        :placeholder="$t('profile.enter_new_input', { input: $t('profile.inputs.email') })"
        rules="required|email"
        type="text"
      />

      <div v-if="!user.google_id">
        <input-profile
          input-value="test-password"
          :label="$t('profile.labels.password')"
          type="password"
          @edit-button-clicked="
            toggleInputVisibility('newPassword', 'mobileProfileNewPasswordModal')
          "
        />

        <div v-if="isInputVisible('newPassword')" class="text-xl">
          <div class="w-full max-w-lg border-2 border-custom-gray rounded p-6 -mt-4 mb-8">
            <span class="text-lg">{{ $t('profile.password_should_contain') + ':' }}</span>
            <ul
              :class="{
                'text-sm mt-6 list-disc list-inside': true,
                'marker:text-green text-white': newPassword.length >= 8 && newPassword.length <= 15,
                'marker:text-gray-400 text-gray-400':
                  newPassword.length < 8 || newPassword.length > 15
              }"
            >
              <li>
                {{ $t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 8 }) }}
              </li>
            </ul>
          </div>
          <input-profile-update
            v-model="newPassword"
            :error="errors.password ? errors.password : ''"
            :is-input-visible="isInputVisible('newPassword')"
            :label="$t('profile.labels.new_password')"
            name="password"
            :placeholder="$t('profile.enter_new_input', { input: $t('profile.inputs.password') })"
            rules="min-8-max-15-lowercase"
            type="password"
          />
          <input-profile-update
            v-model="confirmNewPassword"
            :error="errors.password_confirmation ? errors.password_confirmation : ''"
            :is-input-visible="isInputVisible('newPassword')"
            :label="$t('profile.confirm_new_password')"
            name="password_confirmation"
            :placeholder="$t('profile.confirm_new_password')"
            rules="required|confirmed:@password"
            type="password"
          />
        </div>
      </div>
    </form>
    <span v-if="serverErrorMessage" class="text-red -mt-7 block">{{ serverErrorMessage }}</span>
  </ValidationForm>

  <teleport v-if="isMounted && isOneOfHiddenInputsOpen" to="#profile-section">
    <div class="w-full flex justify-between lg:justify-end mt-14 text-xl px-4 lg:px-0">
      <button-base @click="resetHiddenInputs" class="lg:mr-2">
        {{ $t('texts.cancel') }}
      </button-base>
      <button-base type="submit" form="profile-form" class="bg-red py-3">
        {{ $t('texts.save_changes') }}
      </button-base>
    </div>
  </teleport>
</template>
<script setup>
import { Form as ValidationForm } from 'vee-validate'
import InputProfile from '@/components/ui/inputs/InputProfile.vue'
import InputProfileUpdate from '@/components/ui/inputs/InputProfileUpdate.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import MobileModalProfileNewUsername from '@/components/mobile/mobile-profile/MobileModalProfileNewUsername.vue'
import MobileModalProfileNewEmail from '@/components/mobile/mobile-profile/MobileModalProfileNewEmail.vue'
import MobileModalProfileNewPassword from '@/components/mobile/mobile-profile/MobileModalProfileNewPassword.vue'
import { onMounted, reactive, ref } from 'vue'
import { updateUser } from '@/services/api/users'
import { useModalStore } from '@/stores/useModalStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import scrollToTop from '@/helpers/scrollToTop'
import { useSpinnerStore } from '@/stores/useSpinnerStore'

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const userStore = useUserStore()
const { isUserAlreadyFetched } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const spinnerStore = useSpinnerStore()

const isOneOfHiddenInputsOpen = ref(false)
const hiddenInputsVisibility = reactive({
  newUsername: false,
  newEmail: false,
  newPassword: false
})

const newUsername = ref('')
const newEmail = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const serverErrorMessage = ref('')
const isMounted = ref(false)

const toggleInputVisibility = (inputType, modal) => {
  const { offsetWidth } = document.documentElement

  if (offsetWidth > 1024) {
    hiddenInputsVisibility[inputType] = !hiddenInputsVisibility[inputType]

    for (const hiddenInputVisibility in hiddenInputsVisibility) {
      if (hiddenInputsVisibility[hiddenInputVisibility] === true) {
        return (isOneOfHiddenInputsOpen.value = true)
      } else {
        isOneOfHiddenInputsOpen.value = false
      }
    }
  } else {
    modalStore.toggleModalVisibility(modal)
    scrollToTop()
  }
}

const resetHiddenInputs = () => {
  isOneOfHiddenInputsOpen.value = false

  for (const hiddenInputVisibility in hiddenInputsVisibility) {
    if (hiddenInputsVisibility[hiddenInputVisibility] === true) {
      hiddenInputsVisibility[hiddenInputVisibility] = false
    }
  }

  newUsername.value = ''
  newEmail.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
}

const isInputVisible = (inputType) => {
  return hiddenInputsVisibility[inputType]
}

const onSubmit = async (values) => {
  scrollToTop()
  serverErrorMessage.value = ''
  if (newEmail.value) spinnerStore.toggleActiveStatus()
  await updateUser(values, props.user.id)
    .then((response) => {
      if (response.status === 200) {
        resetHiddenInputs()
        isUserAlreadyFetched.value = false

        if (response.data.message === 'verification email sent successfully') {
          spinnerStore.toggleActiveStatus()

          modalStore.toggleModalVisibility('userUpdateEmailSentModal')
        } else {
          setTimeout(() => {
            modalStore.toggleModalVisibility('userUpdateModal')
          }, 600)
        }
      }
    })
    .catch((error) => {
      spinnerStore.toggleActiveStatus()
      serverErrorMessage.value = error.response.data.message
    })

  setTimeout(() => {
    if (modals.value.userUpdateModal) {
      setTimeout(() => {
        modalStore.toggleModalVisibility('userUpdateModal')
      }, 4000)
    }
  }, 700)
}

onMounted(() => {
  isMounted.value = true
})
</script>