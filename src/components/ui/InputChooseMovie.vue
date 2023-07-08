<template>
  <slot />
  <div
    @click="toggleMoveList"
    :class="{
      'mt-6 flex items-center justify-between border-2 border-black bg-black px-4 h-86 rounded cursor-pointer relative': true,
      '!border-red': error,
      '!border-green': !error && chosenMovie
    }"
  >
    <div
      v-if="isMovieListOpen"
      class="absolute w-full left-0 -bottom-44 flex flex-col bg-lighter-black rounded-b-lg"
    >
      <span
        @click="chooseMovie(movie.id, movie.name)"
        class="text-xl p-3.5 hover:bg-dark-blue duration-300 border-b-2 border-dark-blue"
        v-for="movie in moviesList"
        :key="movie.id"
      >
        {{ movie.name.en }}
      </span>
    </div>
    <div v-if="!chosenMovie" class="flex items-center">
      <icon-list-of-movies />
      <span class="text-2xl ml-3 mt-1">Choose movie</span>
    </div>
    <h2 v-else class="text-2xl">{{ chosenMovie.en }}</h2>
    <icon-arrow-down width="16" height="16" />
  </div>
  <ErrorMessage name="movie_id" class="text-red block mt-2" />
</template>
<script setup>
import IconArrowDown from '@/components/icons/arrows/IconArrowDown.vue'
import IconListOfMovies from '@/components/icons/movies/IconListOfMovies.vue'
import { onMounted, ref } from 'vue'
import { getUserMovies } from '@/services/api/movies'
import { useMovieStore } from '@/stores/useMovieStore'
import { storeToRefs } from 'pinia'
import { ErrorMessage } from 'vee-validate'

defineProps({
  error: {
    required: false,
    type: String
  }
})

const emits = defineEmits(['addChosenMovie'])

const movieStore = useMovieStore()
const { moviesList } = storeToRefs(movieStore)
const { isMoviesAlreadyFetched } = storeToRefs(movieStore)

const isMovieListOpen = ref(false)

const toggleMoveList = () => {
  isMovieListOpen.value = !isMovieListOpen.value
}

const chosenMovie = ref('')

const chooseMovie = (movieId, movieName) => {
  emits('addChosenMovie', movieId)
  chosenMovie.value = movieName
}

onMounted(async () => {
  if (moviesList.value.length < 1) {
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
      })
  }
})
</script>