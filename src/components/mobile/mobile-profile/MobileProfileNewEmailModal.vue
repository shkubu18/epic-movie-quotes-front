<template>
  <modal-profile-input-wrapper>
    <ValidationForm
      v-slot="{ errors, values }"
      id="new-email-form"
      class="bg-dark-blue px-5 py-20"
      @submit="handleSubmit"
    >
      <teleport to="body">
        <mobile-profile-ask-confirmation-modal
          v-if="modals.mobileProfileAskConfirmationModal"
          :values="values"
        />
      </teleport>
      <input-profile-update
        v-model="newEmail"
        :error="errors.email ? errors.email : ''"
        :is-input-visible="true"
        :label="$t('profile.labels.new_email')"
        name="email"
        :placeholder="$t('profile.enter_new_input', { input: $t('profile.inputs.email') })"
        rules="required|email"
        type="text"
      />
    </ValidationForm>

    <div class="w-full flex justify-between lg:justify-end mt-14 text-xl px-4 lg:px-0">
      <button-base @click="toggleModalVisibility('mobileProfileNewEmailModal')">
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
import MobileProfileAskConfirmationModal from '@/components/mobile/mobile-profile/MobileProfileAskConfirmationModal.vue'
import { storeToRefs } from 'pinia'
import InputProfileUpdate from '@/components/ui/inputs/InputProfileUpdate.vue'
import ModalProfileInputWrapper from '@/components/shared/modals/ModalProfileInputWrapper.vue'

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const newEmail = ref('')

const toggleModalVisibility = (modal) => {
  modalStore.toggleModalVisibility(modal)
}

const handleSubmit = () => {
  toggleModalVisibility('mobileProfileAskConfirmationModal')
}
</script>