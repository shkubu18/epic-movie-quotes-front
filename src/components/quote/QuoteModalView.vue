<template>
  <modal-crud-background modal="quoteViewModal" :is-for-movie-quote="isForMovieQuote" />
  <modal-crud-layout>
    <div class="bg-lighter-black w-full lg:w-fit text-white lg:ml-28 rounded-lg">
      <quote-modal-view-header :quote-id="quote.id" />
      <modal-crud-user-info :api-url-for-pictures="apiUrlForPictures" :user="user" />
      <quote-modal-view-article
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
import QuoteModalViewHeader from '@/components/quote/QuoteModalViewHeader.vue'
import QuoteModalViewArticle from '@/components/quote/QuoteModalViewArticle.vue'
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