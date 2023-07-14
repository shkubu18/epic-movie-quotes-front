<template>
  <header class="col-start-1 col-end-4 text-white flex items-center justify-between">
    <h2 class="text-2xl">
      {{
        $t('movies.my_list_of_movies') + ' (' + $t('texts.total') + ' ' + moviesList.length + ')'
      }}
    </h2>
    <div class="flex items-center">
      <input-movie-list-search />
      <button-crud-add @click="toggleModalVisibility('movieAddModal')">
        {{ $t('movies.add_movie_normal_case') }}
      </button-crud-add>
    </div>
  </header>
</template>
<script setup>
import InputMovieListSearch from '@/components/ui/InputMovieListSearch.vue'
import ButtonCrudAdd from '@/components/ui/ButtonCrudAdd.vue'
import { useModalStore } from '@/stores/useModalStore'

defineProps({
  moviesList: {
    required: true,
    type: Array
  }
})

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>