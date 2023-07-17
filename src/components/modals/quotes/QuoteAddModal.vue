<template>
  <modal-crud-background modal="quoteAddModal" :is-for-movie-quote="isForMovieQuote" />
  <modal-crud-quote
    modal="quoteAddModal"
    :api-url-for-pictures="apiUrlForPictures"
    :heading-text="movie ? $t('quotes.add_quote_capitalize_case') : $t('quotes.write_new_quote')"
    :movie="movie"
  >
    <form-quote-add
      :movie="movie"
      :button-text="movie ? $t('quotes.add_quote_normal_case') : $t('texts.post')"
    />
  </modal-crud-quote>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import FormQuoteAdd from '@/components/forms/quotes/FormQuoteAdd.vue'
import ModalCrudQuote from '@/components/shared/modals/ModalCrudAddQuote.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  movie: {
    required: false,
    type: Object
  },
  isForMovieQuote: {
    required: false,
    type: Boolean
  }
})
</script>