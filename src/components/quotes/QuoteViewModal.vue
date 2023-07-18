<template>
  <modal-crud-background modal="quoteViewModal" :is-for-movie-quote="isForMovieQuote" />
  <modal-crud-layout>
    <div class="bg-lighter-black w-full lg:w-fit text-white lg:ml-28 rounded-lg">
      <quote-view-modal-header :quote-id="quote.id" />
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <quote-view-modal-article
        :api-url-for-pictures="apiUrlForPictures"
        :quote="quote"
        :user="user"
      />
    </div>
  </modal-crud-layout>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import ModalCrudLayout from '@/components/layouts/ModalCrudLayout.vue'
import QuoteViewModalHeader from '@/components/quotes/quote-view-modal/QuoteViewModalHeader.vue'
import QuoteViewModalArticle from '@/components/quotes/quote-view-modal/QuoteViewModalArticle.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import ModalCrudUserInfo from '@/components/shared/modals/ModalCrudUserInfo.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quote: {
    required: false,
    type: Object,
    default: () => {}
  },
  isForMovieQuote: {
    required: false,
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>