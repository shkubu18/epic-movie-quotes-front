<template>
  <ValidationForm v-slot="{ errors }" class="w-full lg:w-940 px-8" @submit="handleSubmit()">
    <input-text-area-quote
      :placeholder="movie ? '“Quote in English”' : 'Start create new quote'"
      name="quote_name_en"
      v-model="quoteData.quote_name_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.quote_name_en"
      :movie="movie"
    />
    <input-text-area-quote
      :placeholder="movie ? '”ციტატა ქართულ ენაზე”' : 'ახალი ციტატა'"
      name="quote_name_ka"
      v-model="quoteData.quote_name_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.quote_name_ka"
      :movie="movie"
    />
    <input-picture-default
      name="picture"
      rules="required|image"
      :error="errors.picture"
      v-model="quoteData.picture"
    />
    <input-choose-movie v-if="!movie" :error="errors.movie_id" @add-chosen-movie="addChosenMovie">
      <Field name="movie_id" v-model="quoteData.movie_id" rules="required" class="hidden" />
    </input-choose-movie>

    <span v-if="serverErrorMessage" class="text-red mt-7 block">{{ serverErrorMessage }}</span>

    <button-base class="bg-red w-full mt-7 py-2.5 text-xl">{{ buttonText }}</button-base>
  </ValidationForm>
</template>
<script setup>
import InputTextAreaQuote from '@/components/ui/InputTextAreaQuote.vue'
import InputPictureDefault from '@/components/ui/InputPictureDefault.vue'
import InputChooseMovie from '@/components/ui/InputChooseMovie.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { Field, Form as ValidationForm } from 'vee-validate'
import { reactive, ref } from 'vue'
import { addQuote } from '@/services/api/quotes'
import { useModalStore } from '@/stores/useModalStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'
import scrollToTop from '@/helpers/scrollToTop'

const props = defineProps({
  movie: {
    required: false,
    type: Object
  },
  buttonText: {
    required: false,
    type: String
  }
})

const modalStore = useModalStore()

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const serverErrorMessage = ref('')

const quoteData = reactive({
  quote_name_en: '',
  quote_name_ka: '',
  picture: '',
  movie_id: props.movie ? props.movie.id : null
})

const addChosenMovie = (movieId) => {
  quoteData.movie_id = movieId
}

const handleSubmit = async () => {
  await addQuote(quoteData)
    .then((response) => {
      if (response.status === 201) {
        modalStore.toggleModalVisibility('quoteAddModal')
        scrollToTop()

        if (props.movie) {
          isMovieUpdated.value = true
        }
      }
    })
    .catch((error) => {
      serverErrorMessage.value = error.response.data.message
    })
    .finally(() => {
      newsFeedQuoteStore.resetStore()
    })
}
</script>