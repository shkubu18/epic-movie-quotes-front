<template>
  <header
    class="col-start-1 lg:col-end-4 text-white flex items-start lg:items-center justify-between"
  >
    <div class="flex flex-col lg:flex-row">
      <h2
        :class="{
          'text-2xl mb-3': true,
          'text-xl lg:text-2xl': $i18n.locale === 'ka'
        }"
      >
        {{ $t('movies.my_list_of_movies') }}
      </h2>
      <h4 class="lg:text-xl ml-2">{{ '(' + $t('texts.total') + ' ' + moviesList.length + ')' }}</h4>
    </div>
    <div class="flex items-center">
      <input-movie-list-search class="hidden lg:block" />
      <button-crud-add @click="toggleModalVisibility('movieAddModal')">
        {{ $t('movies.add_movie_normal_case') }}
      </button-crud-add>
    </div>
  </header>
</template>
<script setup>
import InputMovieListSearch from '@/components/ui/inputs/InputMovieListSearch.vue'
import ButtonCrudAdd from '@/components/ui/buttons/ButtonCrudAdd.vue'
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