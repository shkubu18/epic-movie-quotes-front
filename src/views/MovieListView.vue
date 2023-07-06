<template>
  <movie-add-modal :api-url-for-pictures="apiUrlForPictures" v-if="modals.movieAddModal" />
  <the-header />
  <main class="bg-darker-blue flex justify-end min-h-1500 pb-40">
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <div class="grid grid-cols-3 gap-x-10 gap-y-20 py-7 flex-col w-9/12 pr-12 h-fit">
      <movie-list-header :movies-list="moviesList" />
      <div v-if="isLoading" class="col-start-1 col-end-4 flex justify-center mt-10">
        <icon-loading-spinner />
      </div>
      <div
        v-if="moviesList.length < 1 && !isLoading"
        class="w-full flex justify-center items-center col-start-1 col-end-4"
      >
        <h1 class="text-4xl text-yellow">There are no movies in your movie list...</h1>
      </div>
      <movie-list-movie-card
        v-if="!searchingIsActive"
        :movies="moviesList"
        :api-url-for-pictures="apiUrlForPictures"
      />
      <movie-list-movie-card
        v-else
        :movies="searchedMovies"
        :api-url-for-pictures="apiUrlForPictures"
      />
      <h1
        v-if="searchingIsActive && searchedMovies.length < 1"
        class="col-start-1 col-end-4 text-center text-white text-3xl"
      >
        No movies search result...
      </h1>
    </div>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import MovieListMovieCard from '@/components/movies/MovieListMovieCard.vue'
import MovieListHeader from '@/components/movies/MovieListHeader.vue'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import MovieAddModal from '@/components/modals/MovieAddModal.vue'
import { useMovieStore } from '@/stores/useMovieStore'
import { onMounted, ref, watch } from 'vue'
import { getUserMovies } from '@/services/api/movies'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/useModalStore'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const isLoading = ref(false)

const movieStore = useMovieStore()
const { moviesList } = storeToRefs(movieStore)
const { searchedMovies } = storeToRefs(movieStore)
const { searchingIsActive } = storeToRefs(movieStore)
const { isMoviesAlreadyFetched } = storeToRefs(movieStore)
const { isNewMovieAdded } = storeToRefs(movieStore)

watch(isNewMovieAdded, async (newValue) => {
  if (newValue) {
    isLoading.value = true
    await getUserMovies()
      .then((response) => {
        if (response.data.movies) {
          movieStore.addMovies(response.data.movies)
        }
      })
      .finally(() => {
        isLoading.value = false
        isNewMovieAdded.value = false
      })
  }
})

onMounted(async () => {
  if (!isMoviesAlreadyFetched.value) {
    isLoading.value = true
    await getUserMovies()
      .then((response) => {
        if (response.data.movies) {
          movieStore.addMovies(response.data.movies)
        } else {
          moviesList.value = []
        }
      })
      .finally(() => {
        isMoviesAlreadyFetched.value = true
        isLoading.value = false
      })
  }
})
</script>