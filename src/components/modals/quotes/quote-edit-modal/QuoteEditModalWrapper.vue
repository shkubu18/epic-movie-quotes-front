<template>
  <modal-crud-wrapper>
    <div class="bg-lighter-black w-fit text-white ml-28 pb-7 rounded-lg">
      <header
        class="flex justify-center items-center w-full relative py-7 border-b-3 border-b-neutral-800"
      >
        <div
          @click="deleteQuote(quoteId)"
          class="rounded-xl text-gray-200 flex absolute top-9 left-9 cursor-pointer"
        >
          <icon-delete />
          <span class="ml-3">{{ $t('texts.delete') }}</span>
        </div>
        <h1 class="text-2xl font-medium">{{ $t('quotes.edit_quote') }}</h1>
        <icon-modal-close
          @click="toggleModalVisibility('quoteEditModal')"
          class="absolute right-10 top-10 cursor-pointer"
        />
      </header>
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <slot />
    </div>
  </modal-crud-wrapper>
</template>

<script setup>
import IconModalClose from '@/components/icons/IconModalClose.vue'
import ModalCrudWrapper from '@/components/layouts/modals/ModalCrudWrapper.vue'
import ModalCrudUserInfo from '@/components/shared/modals/ModalCrudUserInfo.vue'
import { useModalStore } from '@/stores/useModalStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import IconDelete from '@/components/icons/crud/IconDelete.vue'
import { destroyQuote } from '@/services/api/quotes'
import { useMovieStore } from '@/stores/useMovieStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quoteId: {
    required: true,
    type: Number
  }
})

const modalStore = useModalStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const deleteQuote = async (quoteId) => {
  await destroyQuote(quoteId).then((response) => {
    if (response.status === 200) {
      modalStore.toggleModalVisibility('quoteEditModal')
      isMovieUpdated.value = true
      newsFeedQuoteStore.resetStore()
    }
  })
}
</script>