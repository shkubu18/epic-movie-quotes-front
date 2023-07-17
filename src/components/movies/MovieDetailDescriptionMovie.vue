<template>
  <h1 class="hidden lg:block text-2xl my-9">{{ $t('movies.movie_description') }}</h1>
  <div class="flex flex-col lg:flex-row p-7 lg:p-0">
    <img
      class="lg:w-7/12 lg:h-440 object-cover rounded-xl"
      :src="apiUrlForPictures + movie.picture"
      alt="movie picture"
    />
    <div class="flex flex-col lg:w-2/5 lg:pl-5 mt-5 lg:mt-0">
      <div class="flex items-center justify-between">
        <h1 class="text-xl lg:text-2xl text-yellow">
          {{ movie.name[$i18n.locale] + ' (' + movie.release_date + ')' }}
        </h1>
        <div class="bg-dark-blue text-gray-500 rounded-xl px-0.5 flex items-center">
          <icon-edit
            @click="toggleModalVisibility('movieEditModal')"
            class="my-2.5 mx-4 lg:mx-6 cursor-pointer"
          />
          |
          <icon-delete @click="deleteMovie(movie.id)" class="my-2.5 mx-4 lg:mx-6 cursor-pointer" />
        </div>
      </div>
      <div class="my-7 lg:my-5 flex flex-wrap gap-1.5">
        <span
          class="bg-gray-500 py-0.5 px-2 lg:text-lg mr-1.5 rounded-md"
          v-for="genre in movie.genres"
          :key="genre.id"
        >
          {{ genre.name }}
        </span>
      </div>
      <h2 class="text-lg text-gray-300">
        {{ $t('movies.director') + ': ' }}
        <span class="text-white">{{ movie.director[$i18n.locale] }}</span>
      </h2>
      <p class="mt-5 text-lg">{{ movie.description[$i18n.locale] }}</p>
    </div>
  </div>
</template>
<script setup>
import IconDelete from '@/components/icons/crud/IconDelete.vue'
import IconEdit from '@/components/icons/crud/IconEdit.vue'
import { useModalStore } from '@/stores/useModalStore'
import { destroyMovie } from '@/services/api/movies'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/useMovieStore'
import { storeToRefs } from 'pinia'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  movie: {
    required: true,
    type: Object
  }
})

const router = useRouter()

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const movieStore = useMovieStore()
const { isMoviesAlreadyFetched } = storeToRefs(movieStore)

const deleteMovie = async (movieId) => {
  await destroyMovie(movieId).then((response) => {
    if (response.status === 200) {
      isMoviesAlreadyFetched.value = false
      router.replace({ name: 'my-movies' })
    }
  })
}
</script>