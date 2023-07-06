import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('useMovieStore', () => {
  const moviesList = ref([])
  const searchedMovies = ref([])
  const searchingIsActive = ref(false)
  const isMoviesAlreadyFetched = ref(false)
  const isNewMovieAdded = ref(false)
  const isMovieUpdated = ref(false)

  function addMovies(movies) {
    moviesList.value = [...movies]
  }

  const filterSearchedMovies = (searchText) => {
    moviesList.value = moviesList.value.filter((movie) => movie.name === searchText.value)
  }

  function resetStore() {
    moviesList.value = []
    isMoviesAlreadyFetched.value = false
  }

  return {
    moviesList,
    searchedMovies,
    searchingIsActive,
    addMovies,
    filterSearchedMovies,
    resetStore,
    isMoviesAlreadyFetched,
    isNewMovieAdded,
    isMovieUpdated
  }
})
