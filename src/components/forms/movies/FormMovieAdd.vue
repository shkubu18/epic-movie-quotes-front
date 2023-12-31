<template>
  <ValidationForm v-slot="{ errors }" class="w-full lg:w-940 px-8" @submit="handleSubmit()">
    <input-movie
      label="Movie name"
      name="movie_name_en"
      v-model="movieData.movie_name_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.movie_name_en"
    />
    <input-movie
      label="ფილმის სახელი"
      name="movie_name_ka"
      v-model="movieData.movie_name_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.movie_name_ka"
    />
    <input-genre
      :error="errors.genres"
      :chosen-genres="chosenGenres"
      :genres-list="genresList"
      @add-chosen-genre="addChosenGenre"
      @remove-chosen-genre="removeChosenGenre"
    >
      <Field name="genres" rules="required" v-model="movieData.genres" class="hidden" />
    </input-genre>
    <input-movie
      label="წელი/Year"
      name="release_date"
      v-model="movieData.release_date"
      type="text"
      rules="required|between:1888,2023"
      :error="errors.release_date"
    />
    <input-movie
      label="Director"
      name="director_en"
      v-model="movieData.director_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.director_en"
    />
    <input-movie
      label="რეჟისორი"
      name="director_ka"
      v-model="movieData.director_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.director_ka"
    />
    <input-text-area-movie
      label="Movie description"
      name="description_en"
      v-model="movieData.description_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.description_en"
    />
    <input-text-area-movie
      label="ფილმის აღწერა"
      name="description_ka"
      v-model="movieData.description_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.description_ka"
    />
    <input-picture-default
      name="picture"
      rules="required|image"
      :error="errors.picture"
      v-model="movieData.picture"
    />

    <span v-if="serverErrorMessage" class="text-red mt-7 block">{{ serverErrorMessage }}</span>

    <button-base class="bg-red w-full mt-7 py-2">
      {{ $t('movies.add_movie_normal_case') }}
    </button-base>
  </ValidationForm>
</template>
<script setup>
import InputMovie from '@/components/ui/inputs/InputMovie.vue'
import InputGenre from '@/components/ui/inputs/InputGenre.vue'
import InputTextAreaMovie from '@/components/ui/inputs/InputTextAreaMovie.vue'
import InputPictureDefault from '@/components/ui/inputs/InputPictureDefault.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { Field, Form as ValidationForm } from 'vee-validate'
import { onMounted, reactive, ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { addMovie, getMovieGenres } from '@/services/api/movies'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'
import scrollToTop from '@/helpers/scrollToTop'

const genresList = ref([])
const chosenGenres = ref([])

const addChosenGenre = (genreId, genreName) => {
  chosenGenres.value.push({
    id: genreId,
    name: genreName
  })
  genresList.value = genresList.value.filter((genre) => genre.id !== genreId)

  movieData.genres = chosenGenres.value.map((obj) => obj.id).join(',')
}

const removeChosenGenre = (genreName, genreId) => {
  const index = chosenGenres.value.findIndex((genre) => genre.id === genreId)
  if (index !== -1) {
    const removedGenre = chosenGenres.value.splice(index, 1)[0]
    genresList.value.unshift(removedGenre)
  }

  movieData.genres = chosenGenres.value
    .filter((obj) => obj.id !== genreId)
    .map((obj) => obj.id)
    .join(',')
}

const movieData = reactive({
  movie_name_en: '',
  movie_name_ka: '',
  genres: '',
  release_date: '',
  director_en: '',
  director_ka: '',
  description_en: '',
  description_ka: '',
  picture: null
})

const modalStore = useModalStore()

const movieStore = useMovieStore()
const { isNewMovieAdded } = storeToRefs(movieStore)

const serverErrorMessage = ref('')

const handleSubmit = async () => {
  await addMovie(movieData)
    .then((response) => {
      if (response.status === 201) {
        modalStore.toggleModalVisibility('movieAddModal')
        isNewMovieAdded.value = true

        scrollToTop()
      }
    })
    .catch((error) => {
      serverErrorMessage.value = error.response.data.message
    })
}

onMounted(async () => {
  await getMovieGenres().then((response) => {
    if (response.status === 200) {
      genresList.value = [...response.data.genres]
    }
  })
})
</script>