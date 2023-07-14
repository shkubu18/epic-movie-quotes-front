<template>
  <modal-crud-background modal="movieAddModal" />
  <modal-crud-movie
    modal="movieAddModal"
    :api-url-for-pictures="apiUrlForPictures"
    :heading-text="$t('movies.add_movie_capitalize_case')"
  >
    <form-movie-add />
  </modal-crud-movie>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import ModalCrudMovie from '@/components/shared/modals/ModalCrudMovie.vue'
import FormMovieAdd from '@/components/forms/FormMovieAdd.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  }
})
</script>