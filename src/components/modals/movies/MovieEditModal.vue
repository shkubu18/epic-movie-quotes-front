<template>
  <modal-crud-background modal="movieEditModal" />
  <modal-crud-movie
    modal="movieEditModal"
    :api-url-for-pictures="apiUrlForPictures"
    :heading-text="$t('movies.edit_movie')"
  >
    <form-movie-edit />
  </modal-crud-movie>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import ModalCrudMovie from '@/components/shared/modals/ModalCrudMovie.vue'
import FormMovieEdit from '@/components/forms/FormMovieEdit.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  }
})
</script>