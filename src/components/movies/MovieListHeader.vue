<template>
  <header class="col-start-1 col-end-4 text-white flex items-center justify-between">
    <h2 class="text-2xl">My list of movies {{ '(' + 'Total ' + moviesList.length + ')' }}</h2>
    <div class="flex items-center">
      <input-movie-list-search />
      <button-crud-add @click="toggleModalVisibility('movieAddModal')">Add movie</button-crud-add>
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