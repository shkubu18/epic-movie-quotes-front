<template>
  <modal-crud-wrapper>
    <div class="bg-lighter-black w-fit text-white ml-28 py-10 rounded-lg">
      <header
        class="flex justify-center items-center w-full relative pb-5 border-b-3 border-b-neutral-800"
      >
        <h1 class="text-2xl font-medium capitalize">{{ headingText }}</h1>
        <icon-modal-close
          @click="toggleModalVisibility(modal)"
          class="absolute right-10 cursor-pointer"
        />
      </header>
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <section v-if="movie" class="h-fit flex items-start justify-between w-fit pl-7 mb-7">
        <img
          class="w-72 h-40 object-cover rounded-xl"
          :src="apiUrlForPictures + movie.picture"
          alt="movie picture"
        />
        <div class="flex flex-col ml-8 pt-3">
          <h2 class="text-2xl text-yellow">
            {{ movie.name[$i18n.locale] + ' (' + movie.release_date + ')' }}
          </h2>
          <div class="my-5 flex flex-wrap gap-1.5">
            <span
              class="bg-gray-500 py-1.5 px-2.5 text-lg mr-1.5 rounded-sm"
              v-for="genre in movie.genres"
              :key="genre.id"
            >
              {{ genre.name }}
            </span>
          </div>
          <h2 class="text-lg">{{ $t('movies.director') + ':' + movie.director[$i18n.locale] }}</h2>
        </div>
      </section>
      <slot />
    </div>
  </modal-crud-wrapper>
</template>
<script setup>
import { useModalStore } from '@/stores/useModalStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import ModalCrudWrapper from '@/components/layouts/modals/ModalCrudWrapper.vue'
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
    type: Object
  }
})

const modalStore = useModalStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>