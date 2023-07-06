<template>
  <ValidationForm v-slot="{ errors }" class="w-940 px-8" @submit="handleSubmit()">
    <input-crud
      label="Movie name"
      name="name_en"
      v-model="movieData.name_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.name_en"
    />
    <input-crud
      label="ფილმის სახელი"
      name="name_ka"
      v-model="movieData.name_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.name_ka"
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
    <input-crud
      label="წელი/Year"
      name="release_date"
      v-model="movieData.release_date"
      type="text"
      rules="required|between:1888,2023"
      :error="errors.release_date"
    />
    <input-crud
      label="Director"
      name="director_en"
      v-model="movieData.director_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.director_en"
    />
    <input-crud
      label="რეჟისორი"
      name="director_ka"
      v-model="movieData.director_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.director_ka"
    />
    <input-text-area
      label="Movie description"
      name="description_en"
      v-model="movieData.description_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.description_en"
    />
    <input-text-area
      label="ფილმის აღწერა"
      name="description_ka"
      v-model="movieData.description_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.description_ka"
    />
    <input-picture
      name="picture"
      rules="required|image"
      :error="errors.picture"
      v-model="movieData.picture"
    />

    <span v-if="serverErrorMessage" class="text-red mt-7 block">{{ serverErrorMessage }}</span>

    <button-base class="bg-red w-full mt-7 py-2">Add movie</button-base>
  </ValidationForm>
</template>
<script setup>
import InputCrud from '@/components/ui/InputCrud.vue'
import InputGenre from '@/components/ui/InputGenre.vue'
import InputTextArea from '@/components/ui/InputTextArea.vue'
import InputPicture from '@/components/ui/InputPicture.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { Field, Form as ValidationForm } from 'vee-validate'
import { onMounted, reactive, ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { addMovie, getMovieGenres } from '@/services/api/movies'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'

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
  name_en: '',
  name_ka: '',
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

        window.scrollTo({ top: 0, behavior: 'smooth' })
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