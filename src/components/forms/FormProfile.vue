<template>
  <ValidationForm as="div" class="w-3/5" v-slot="{ errors, handleSubmit }">
    <form @submit="handleSubmit($event, onSubmit)" id="profile-form">
      <input-profile
        :input-value="user.username"
        label="Username"
        type="text"
        @edit-button-clicked="toggleInputVisibility('newUsername')"
      />
      <input-profile-update
        v-model="newUsername"
        :error="errors.username ? errors.username : ''"
        :is-input-visible="isInputVisible('newUsername')"
        label="New username"
        name="username"
        placeholder="Enter new username"
        rules="min-3-max-15-lowercase"
        type="text"
      />
      <input-profile
        :google-user="!!user.google_id"
        :input-value="user.email"
        label="Email"
        type="text"
        @edit-button-clicked="toggleInputVisibility('newEmail')"
      />
      <input-profile-update
        v-model="newEmail"
        :error="errors.email ? errors.email : ''"
        :is-input-visible="isInputVisible('newEmail')"
        label="New email"
        name="email"
        placeholder="Enter new email"
        rules="required|email"
        type="text"
      />

      <div v-if="!user.google_id">
        <input-profile
          input-value="test-password"
          label="Password"
          type="password"
          @edit-button-clicked="toggleInputVisibility('newPassword')"
        />

        <div v-if="isInputVisible('newPassword')" class="text-xl">
          <div class="w-full max-w-lg border-2 border-custom-gray rounded p-6 -mt-4 mb-8">
            <span class="text-lg">Passwords should contain:</span>
            <ul
              :class="{
                'text-sm mt-6 list-disc list-inside': true,
                'marker:text-green text-white': newPassword.length >= 8 && newPassword.length <= 15,
                'marker:text-gray-400 text-gray-400':
                  newPassword.length < 8 || newPassword.length > 15
              }"
            >
              <li>At least 8 & max.15 lower case characters</li>
            </ul>
          </div>
          <input-profile-update
            v-model="newPassword"
            :error="errors.password ? errors.password : ''"
            :is-input-visible="isInputVisible('newPassword')"
            label="New password"
            name="password"
            placeholder="Enter new password"
            rules="min-8-max-15-lowercase"
            type="password"
          />
          <input-profile-update
            v-model="confirmNewPassword"
            :error="errors.password_confirmation ? errors.password_confirmation : ''"
            :is-input-visible="isInputVisible('newPassword')"
            label="Confirm new password"
            name="password_confirmation"
            placeholder="Confirm new password"
            rules="required|confirmed:@password"
            type="password"
          />
        </div>
      </div>
    </form>
    <span v-if="serverErrorMessage" class="text-red -mt-7 block">{{ serverErrorMessage }}</span>
  </ValidationForm>

  <teleport v-if="isMounted && isOneOfHiddenInputsOpen" to="#profile-section">
    <div class="w-full flex justify-end mt-14 text-xl">
      <button-base @click="resetHiddenInputs" class="mr-2">Cancel</button-base>
      <button-base type="submit" form="profile-form" class="bg-red py-3">
        Save changes
      </button-base>
    </div>
  </teleport>
</template>
<script setup>
import { Form as ValidationForm } from 'vee-validate'
import InputProfile from '@/components/ui/InputProfile.vue'
import InputProfileUpdate from '@/components/ui/InputProfileUpdate.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
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

const toggleInputVisibility = (inputType) => {
  hiddenInputsVisibility[inputType] = !hiddenInputsVisibility[inputType]

  for (const hiddenInputVisibility in hiddenInputsVisibility) {
    if (hiddenInputsVisibility[hiddenInputVisibility] === true) {
      return (isOneOfHiddenInputsOpen.value = true)
    } else {
      isOneOfHiddenInputsOpen.value = false
    }
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
  serverErrorMessage.value = ''
  spinnerStore.toggleActiveStatus()
  await updateUser(values, props.user.id)
    .then((response) => {
      if (response.status === 200) {
        resetHiddenInputs()
        isUserAlreadyFetched.value = false

        if (response.data.message === 'verification email sent successfully') {
          modalStore.toggleModalVisibility('emailSentProfileModal')
        } else {
          setTimeout(() => {
            modalStore.toggleModalVisibility('userUpdateModal')
          }, 600)
        }

        setTimeout(() => {
          scrollToTop()
        }, 200)
      }
    })
    .catch((error) => {
      serverErrorMessage.value = error.response.data.message
    })
    .finally(() => {
      spinnerStore.toggleActiveStatus()
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