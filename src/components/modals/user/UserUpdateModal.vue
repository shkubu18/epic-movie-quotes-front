<template>
  <div
    class="absolute top-28 lg:right-16 px-5 flex items-center justify-between w-full lg:w-fit z-20"
  >
    <div class="flex items-center justify-between w-full p-4 bg-light-green rounded">
      <div class="flex items-center">
        <icon-updated-successfully />
        <h2 class="lg:text-xl text-dark-green ml-3">
          {{ $t('profile.changes_updated_successfully') }}
        </h2>
      </div>
      <icon-modal-close
        :user-update="true"
        class="lg:hidden cursor-pointer"
        @click="toggleModalVisibility('userUpdateModal')"
      />
    </div>
  </div>
</template>
<script setup>
import IconUpdatedSuccessfully from '@/components/icons/IconUpdatedSuccessfully.vue'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()
const { toggleModalVisibility } = modalStore
</script>