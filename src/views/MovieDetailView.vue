<template>
  <movie-edit-modal :api-url-for-pictures="apiUrlForPictures" v-if="modals.movieEditModal" />
  <the-header />
  <main class="bg-darker-blue flex justify-end min-h-1500 pb-40">
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <section class="w-9/12 pr-12 text-white">
      <div class="w-full flex justify-center">
        <icon-loading-spinner v-if="!isMovieLoaded" class="mt-20" />
      </div>
      <div v-if="isMovieLoaded">
        <movie-detail-description-movie :api-url-for-pictures="apiUrlForPictures" :movie="movie" />
        <div class="mt-10 flex items-center">
          <h2 class="text-2xl">
            Quotes (total {{ movie.quotes ? movie.quotes.length : 0 }})
            <span class="text-gray-500">|</span>
          </h2>
          <button-crud-add class="ml-3">Add quote</button-crud-add>
        </div>
        <movie-detail-description-quotes
          :api-url-for-pictures="apiUrlForPictures"
          :quotes="movie.quotes ? movie.quotes : null"
        />
      </div>
    </section>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import MovieDetailDescriptionMovie from '@/components/movies/MovieDetailDescriptionMovie.vue'
import ButtonCrudAdd from '@/components/ui/ButtonCrudAdd.vue'
import MovieDetailDescriptionQuotes from '@/components/movies/MovieDetailDescriptionQuotes.vue'
import MovieEditModal from '@/components/modals/MovieEditModal.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMovie } from '@/services/api/movies'
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const route = useRoute()
const router = useRouter()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const movie = ref({})
const isMovieLoaded = ref(false)

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

watch(isMovieUpdated, async (newValue) => {
  if (newValue) {
    isMovieLoaded.value = false
    await getMovie(route.params.id)
      .then((response) => {
        movie.value = response.data.movie
        isMovieLoaded.value = true

        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch((error) => {
        if (error.response.status === 403) {
          router.replace({ name: '403' })
        } else {
          router.replace({ name: '404', params: { notFound: 'my-movies/' + route.params.id } })
        }
      })
      .finally(() => {
        isMovieUpdated.value = false
      })
  }
})

onMounted(async () => {
  await getMovie(route.params.id)
    .then((response) => {
      movie.value = response.data.movie

      isMovieLoaded.value = true
    })
    .catch((error) => {
      if (error.response.status === 403) {
        router.replace({ name: '403' })
      } else {
        router.replace({ name: '404', params: { notFound: 'my-movies/' + route.params.id } })
      }
    })
})
</script>