<template>
  <movie-modal-edit :api-url-for-pictures="apiUrlForPictures" v-if="modals.movieEditModal" />
  <quote-modal-add
    v-if="modals.quoteAddModal"
    :api-url-for-pictures="apiUrlForPictures"
    :is-for-movie-quote="true"
    :movie="movie"
  />
  <quote-modal-view
    v-if="modals.quoteViewModal"
    :api-url-for-pictures="apiUrlForPictures"
    :quote="movie.quotes[quote]"
    :is-for-movie-quote="true"
  />
  <quote-modal-edit
    v-if="modals.quoteEditModal"
    :api-url-for-pictures="apiUrlForPictures"
    :quote="movie.quotes[quote]"
    :movie-id="movie.id"
    :is-for-movie-quote="true"
  />
  <the-header />
  <main
    class="bg-darker-blue flex justify-center lg:justify-end min-h-1650 pb-40"
    @click="closeActiveModals"
  >
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <section v-show="isQuoteModalsInactive" class="lg:w-9/12 lg:pr-12 text-white">
      <div class="w-full flex justify-center">
        <icon-loading-spinner v-if="!isMovieLoaded" class="mt-20" />
      </div>
      <div v-if="isMovieLoaded">
        <movie-detail-description-movie :api-url-for-pictures="apiUrlForPictures" :movie="movie" />
        <div class="mt-10 flex items-start lg:items-center flex-col lg:flex-row px-7 lg:p-0">
          <h2 class="text-2xl order-2 lg:order-1 mt-12 lg:mt-0">
            {{ $t('quotes.quotes') }}
            <br class="lg:hidden" />
            <span class="text-base lg:text-2xl">
              ({{ $t('texts.total') }} {{ movie.quotes ? movie.quotes.length : 0 }})
            </span>
            <span class="hidden lg:inline text-gray-500">|</span>
          </h2>
          <div
            class="pb-7 lg:p-0 border-b border-default-border-b-color lg:border-none w-full lg:w-fit order-1 lg:order-2"
          >
            <button-crud-add @click="openQuoteAddModal" class="lg:ml-3 lg:mb-0">
              {{ $t('quotes.add_quote_normal_case') }}
            </button-crud-add>
          </div>
        </div>
        <movie-detail-description-quotes
          :api-url-for-pictures="apiUrlForPictures"
          :quotes="movie.quotes ? movie.quotes : null"
          @get-quote="getQuote"
        />
      </div>
    </section>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import MovieDetailDescriptionMovie from '@/components/movie/MovieDescription.vue'
import ButtonCrudAdd from '@/components/ui/buttons/ButtonCrudAdd.vue'
import MovieDetailDescriptionQuotes from '@/components/movie/MovieDescriptionQuotes.vue'
import MovieModalEdit from '@/components/movie/MovieModalEdit.vue'
import QuoteModalAdd from '@/components/quote/QuoteModalAdd.vue'
import QuoteModalView from '@/components/quote/QuoteModalView.vue'
import QuoteModalEdit from '@/components/quote/QuoteModalEdit.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMovie } from '@/services/api/movies'
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'
import scrollToTop from '@/helpers/scrollToTop'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const route = useRoute()
const router = useRouter()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const closeActiveModals = () => {
  if (modals.value.mobileMenuModal || modals.value.mobileNewsFeedSearchModal) {
    modalStore.closeActiveModal()
  }
}

const isQuoteModalsInactive = computed(() => {
  return !modals.value.quoteAddModal && !modals.value.quoteViewModal && !modals.value.quoteEditModal
})

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const movie = ref({})
const isMovieLoaded = ref(false)

const quote = ref(null)

const getQuote = (quoteIndex, action) => {
  quote.value = quoteIndex

  if (action === 'view') modalStore.toggleModalVisibility('quoteViewModal')
  if (action === 'edit') modalStore.toggleModalVisibility('quoteEditModal')
  setTimeout(() => {
    scrollToTop()
  }, 200)
}

const openQuoteAddModal = () => {
  modalStore.toggleModalVisibility('quoteAddModal')
  scrollToTop()
}

watch(isMovieUpdated, async (newValue) => {
  if (newValue) {
    isMovieLoaded.value = false
    await getMovie(route.params.id)
      .then((response) => {
        movie.value = response.data.movie
        isMovieLoaded.value = true

        scrollToTop()
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