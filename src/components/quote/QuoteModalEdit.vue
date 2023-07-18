<template>
  <modal-crud-background modal="quoteEditModal" :is-for-movie-quote="isForMovieQuote" />
  <quote-edit-modal-wrapper :api-url-for-pictures="apiUrlForPictures" :quote-id="quote.id">
    <form-quote-edit :quote="quote" :movie-id="movieId" />
  </quote-edit-modal-wrapper>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import FormQuoteEdit from '@/components/forms/quotes/FormQuoteEdit.vue'
import QuoteEditModalWrapper from '@/components/quote/QuoteEditModalWrapper.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quote: {
    required: true,
    type: Object
  },
  movieId: {
    required: true,
    type: Number
  },
  isForMovieQuote: {
    required: false,
    type: Boolean,
    default: false
  }
})
</script>