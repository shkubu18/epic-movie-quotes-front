<template>
  <modal-crud-layout>
    <div class="bg-lighter-black w-full lg:w-fit text-white lg:ml-28 py-10 rounded-lg">
      <header
        class="flex justify-center items-center w-full relative pb-5 border-b-3 border-b-neutral-800"
      >
        <h1 class="text-xl lg:text-2xl font-medium capitalize">{{ headingText }}</h1>
        <icon-modal-close
          @click="toggleModalVisibility(modal)"
          class="absolute right-10 cursor-pointer"
        />
      </header>
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <section
        v-if="movie"
        class="h-fit flex items-center lg:items-start lg:justify-between w-full lg:w-fit pl-7 mb-7"
      >
        <img
          class="w-28 h-24 lg:w-72 lg:h-40 object-cover rounded-xl"
          :src="apiUrlForPictures + movie.picture"
          alt="movie picture"
        />
        <div class="flex flex-col ml-3 lg:ml-8 lg:pt-3">
          <h2 class="lg:text-2xl text-yellow">
            {{ movie.name[$i18n.locale] + ' (' + movie.release_date + ')' }}
          </h2>
          <div class="my-3 lg:my-5 flex flex-wrap gap-1.5">
            <span
              class="bg-gray-500 lg:py-1.5 px-1 font-bold lg:px-2.5 text-lg mr-1.5 rounded-sm text-xss lg:text-xs"
              v-for="genre in movie.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </span>
          </div>
          <h2 class="lg:text-lg">
            {{ $t('movies.director') + ':' + movie.director[$i18n.locale] }}
          </h2>
        </div>
      </section>
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
  },
  movie: {
    required: false,
    type: Object,
    default: () => {}
  }
})

const modalStore = useModalStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>