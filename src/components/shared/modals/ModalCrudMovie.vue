<template>
  <modal-crud-layout>
    <div class="bg-lighter-black w-full lg:w-fit text-white lg:ml-28 py-10 rounded-lg">
      <header
        class="flex justify-center items-center w-full relative pb-5 border-b-3 border-b-neutral-800"
      >
        <h1 class="text-xl lg:text-2xl font-medium">{{ headingText }}</h1>
        <icon-modal-close
          @click="toggleModalVisibility(modal)"
          class="absolute right-10 cursor-pointer"
        />
      </header>
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <slot />
    </div>
  </modal-crud-layout>
</template>
<script setup>
import { useModalStore } from '@/stores/useModalStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import ModalCrudLayout from '@/components/layouts/ModalCrudLayout.vue'
import ModalCrudUserInfo from '@/components/shared/modals/ModalCrudUserInfo.vue'

defineProps({
  modal: {
    required: true,
    type: String
  },
  apiUrlForPictures: {
    required: true,
    type: String
  },
  headingText: {
    required: true,
    type: String
  }
})

const modalStore = useModalStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>