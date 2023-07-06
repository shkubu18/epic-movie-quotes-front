<template>
  <div class="absolute left-1/2 right-1/2 mt-28 flex justify-center z-20">
    <div class="bg-lighter-black w-fit text-white ml-28 py-10 rounded-lg">
      <header
        class="flex justify-center items-center w-full relative pb-5 border-b-3 border-b-neutral-800"
      >
        <h1 class="text-2xl font-medium">{{ headingText }}</h1>
        <icon-modal-close
          @click="toggleModalVisibility(modal)"
          class="absolute right-10 cursor-pointer"
        />
      </header>
      <section class="flex items-center justify-start my-7 w-full pl-7">
        <img
          class="h-16 rounded-full mr-6"
          :src="
            user.profile_picture
              ? apiUrlForPictures + user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="profile picture"
        />
        <h2 class="text-white text-xl">{{ user.username }}</h2>
      </section>
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useModalStore } from '@/stores/useModalStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

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