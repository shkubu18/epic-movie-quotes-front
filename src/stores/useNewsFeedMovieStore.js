import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsFeedMovieStore = defineStore('useNewsFeedMovieStore', () => {
  const searchedMovies = ref([])
  const searchingMoviesIsActive = ref(false)
  const noMoviesSearchResult = ref(false)

  function addSearchedMovies(movies) {
    searchingMoviesIsActive.value = true
    searchedMovies.value = [...movies]
    noMoviesSearchResult.value = movies.length === 0
  }

  return {
    searchedMovies,
    addSearchedMovies,
    searchingMoviesIsActive,
    noMoviesSearchResult
  }
})
