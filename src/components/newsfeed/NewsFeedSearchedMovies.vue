<template>
  <h1 v-if="noMoviesSearchResult" class="text-white text-3xl mt-16">No movies search result...</h1>
  <div class="w-940 grid grid-cols-2 gap-14 mt-5 justify-center">
    <article class="text-white" v-for="movie in searchedMovies" :key="movie.id">
      <div class="flex items-center">
        <img
          class="h-14 w-14 rounded-full mr-6 object-cover"
          :src="
            movie.user.profile_picture
              ? apiUrlForPictures + movie.user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="quote author picture"
        />
        <h2 class="text-white text-xl">{{ movie.user.username }}</h2>
      </div>
      <h1 class="text-2xl mt-5 mb-3">{{ movie.name }} {{ '(' + movie.release_date + ')' }}</h1>
      <img
        class="h-370 w-440 rounded-2xl mr-6"
        :src="apiUrlForPictures + movie.picture"
        alt="movie picture"
      />
      <div v-if="movie.quotes" class="mt-5 flex items-center">
        <span class="text-xl mr-3">{{ movie.quotes.length }}</span>
        <icon-quote />
      </div>
    </article>
  </div>
</template>

<script setup>
import IconQuote from '@/components/icons/IconQuote.vue'
import { storeToRefs } from 'pinia'
import { useNewsFeedMovieStore } from '@/stores/useNewsFeedMovieStore'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  }
})

const newsFeedMovieStore = useNewsFeedMovieStore()
const { searchedMovies } = storeToRefs(newsFeedMovieStore)
const { noMoviesSearchResult } = storeToRefs(newsFeedMovieStore)
</script>