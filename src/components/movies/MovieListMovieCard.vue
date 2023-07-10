<template>
  <article v-for="movie in movies" :key="movie.id" class="text-white">
    <img
      @click="seeDetailMovie(movie.id)"
      class="h-370 w-fit rounded-2xl object-cover cursor-pointer"
      :src="apiUrlForPictures + movie.picture"
      alt="movie picture"
    />
    <h2 class="text-2xl mt-5 mb-3 uppercase">
      {{ movie.name.en }} {{ '(' + movie.release_date + ')' }}
    </h2>
    <div class="mt-5 flex items-center">
      <span v-if="movie.quotes" class="text-xl mr-3">{{ movie.quotes.length }}</span>
      <icon-quote />
    </div>
  </article>
</template>
<script setup>
import IconQuote from '@/components/icons/quotes/IconQuote.vue'
import { useRouter } from 'vue-router'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  movies: {
    required: true,
    type: Array
  }
})

const router = useRouter()

const seeDetailMovie = (movieId) => {
  router.push(`/my-movies/${movieId}`)
}
</script>