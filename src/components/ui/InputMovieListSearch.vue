<template>
  <div
    @click="openSearchBar"
    :class="{
      'flex items-center relative cursor-pointer ml-2 py-4 text-white mr-10': true,
      'w-32': !isSearchBarOpen,
      'w-96  pl-14 border-b-2 border-newsfeed-quote-border-color': isSearchBarOpen
    }"
  >
    <icon-search-bar class="absolute left-6" />
    <input
      ref="searchInput"
      @input="setSearchedMovies"
      @focusout="closeSearchBar"
      v-model="searchText"
      :class="{
        'bg-transparent text-right placeholder:text-gray-300 border-none outline-none w-full text-xl': true,
        '!text-left': isSearchBarOpen,
        'cursor-pointer': !isSearchBarOpen
      }"
      type="text"
      :placeholder="isSearchBarOpen ? $t('movies.search_movie') : $t('texts.search')"
    />
  </div>
</template>
<script setup>
import IconSearchBar from '@/components/icons/IconSearchBar.vue'
import { ref } from 'vue'
import { useMovieStore } from '@/stores/useMovieStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const movieStore = useMovieStore()
const { moviesList } = storeToRefs(movieStore)
const { searchedMovies } = storeToRefs(movieStore)
const { searchingIsActive } = storeToRefs(movieStore)

const isSearchBarOpen = ref(false)
const searchText = ref('')
const searchInput = ref(null)
const openSearchBar = () => {
  isSearchBarOpen.value = true
  searchInput.value.focus()
}

const closeSearchBar = () => {
  isSearchBarOpen.value = false
  searchingIsActive.value = false
  searchText.value = ''
}

const setSearchedMovies = () => {
  const searchResult = searchText.value.toLowerCase()
  searchingIsActive.value = searchResult !== ''

  searchedMovies.value =
    searchResult !== ''
      ? moviesList.value.filter((movie) =>
          movie.name[locale.value].toLowerCase().includes(searchResult)
        )
      : []
}
</script>