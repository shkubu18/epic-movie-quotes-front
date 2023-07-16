<template>
  <header
    class="flex justify-center items-center w-full relative py-7 border-b-3 border-b-neutral-800"
  >
    <div class="text-gray-500 rounded-xl px-0.5 flex items-center absolute top-6 left-2">
      <icon-edit
        @click="toggleModals('quoteViewModal', 'quoteEditModal')"
        class="my-2.5 mx-3 lg:mx-6 cursor-pointer"
      />
      |
      <icon-delete @click="deleteQuote(quoteId)" class="my-2.5 mx-3 lg:mx-6 cursor-pointer" />
    </div>
    <h1 class="font-xl lg:text-2xl font-medium">{{ $t('quotes.view_quote') }}</h1>
    <icon-modal-close
      @click="toggleModalVisibility('quoteViewModal')"
      class="absolute right-5 cursor-pointer"
    />
  </header>
</template>
<script setup>
import IconModalClose from '@/components/icons/IconModalClose.vue'
import IconEdit from '@/components/icons/crud/IconEdit.vue'
import IconDelete from '@/components/icons/crud/IconDelete.vue'
import { useModalStore } from '@/stores/useModalStore'
import { destroyQuote } from '@/services/api/quotes'
import { useMovieStore } from '@/stores/useMovieStore'
import { storeToRefs } from 'pinia'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

defineProps({
  quoteId: {
    required: true,
    type: Number
  }
})

const modalStore = useModalStore()

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}

const deleteQuote = async (quoteId) => {
  await destroyQuote(quoteId).then((response) => {
    if (response.status === 200) {
      modalStore.toggleModalVisibility('quoteViewModal')
      isMovieUpdated.value = true
      newsFeedQuoteStore.resetStore()
    }
  })
}
</script>