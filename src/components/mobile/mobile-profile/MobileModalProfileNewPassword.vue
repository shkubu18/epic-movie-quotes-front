<template>
  <modal-profile-input-wrapper>
    <ValidationForm
      v-slot="{ errors, values }"
      id="new-email-form"
      class="bg-dark-blue px-5 py-20"
      @submit="handleSubmit"
    >
      <div class="w-full max-w-lg border-2 border-custom-gray rounded p-6 -mt-4 mb-8">
        <span class="text-lg">{{ $t('profile.password_should_contain') + ':' }}</span>
        <ul
          :class="{
            'text-sm mt-6 list-disc list-inside': true,
            'marker:text-green text-white': newPassword.length >= 8 && newPassword.length <= 15,
            'marker:text-gray-400 text-gray-400': newPassword.length < 8 || newPassword.length > 15
          }"
        >
          <li>
            {{ $t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 8 }) }}
          </li>
        </ul>
      </div>
      <teleport to="body">
        <mobile-modal-profile-ask-confirmation
          v-if="modals.mobileProfileAskConfirmationModal"
          :values="values"
        />
      </teleport>
      <input-profile-update
        v-model="newPassword"
        :error="errors.password ? errors.password : ''"
        :is-input-visible="true"
        :label="$t('profile.labels.new_password')"
        name="password"
        :placeholder="$t('profile.enter_new_input', { input: $t('profile.inputs.password') })"
        rules="min-8-max-15-lowercase"
        type="password"
      />
      <input-profile-update
        v-model="confirmNewPassword"
        :error="errors.password_confirmation ? errors.password_confirmation : ''"
        :is-input-visible="true"
        :label="$t('profile.confirm_new_password')"
        name="password_confirmation"
        :placeholder="$t('profile.confirm_new_password')"
        rules="required|confirmed:@password"
        type="password"
      />
    </ValidationForm>

    <div class="w-full flex justify-between lg:justify-end mt-14 text-xl px-4 lg:px-0">
      <button-base @click="toggleModalVisibility('mobileProfileNewPasswordModal')">
        {{ $t('texts.cancel') }}
      </button-base>
      <button-base type="submit" class="bg-red py-3" form="new-email-form">
        {{ $t('texts.save_changes') }}
      </button-base>
    </div>
  </modal-profile-input-wrapper>
</template>
<script setup>
import { Form as ValidationForm } from 'vee-validate'
import { ref } from 'vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'
import MobileModalProfileAskConfirmation from '@/components/mobile/mobile-profile/MobileModalProfileAskConfirmation.vue'
import { storeToRefs } from 'pinia'
import InputProfileUpdate from '@/components/ui/inputs/InputProfileUpdate.vue'
import scrollToTop from '@/helpers/scrollToTop'
import ModalProfileInputWrapper from '@/components/shared/modals/ModalProfileInputWrapper.vue'

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const newPassword = ref('')
const confirmNewPassword = ref('')

const toggleModalVisibility = (modal) => {
  modalStore.toggleModalVisibility(modal)
}

const handleSubmit = () => {
  toggleModalVisibility('mobileProfileAskConfirmationModal')
  scrollToTop()
}
</script>