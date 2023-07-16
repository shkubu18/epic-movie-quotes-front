<template>
  <ValidationForm v-slot="{ errors }" class="w-full lg:w-940 px-8" @submit="handleSubmit()">
    <input-text-area-quote
      placeholder="“Quote in English”"
      name="quote_name_en"
      v-model="quoteData.quote_name_en"
      type="text"
      language="Eng"
      rules="required|english-text"
      :error="errors.quote_name_en"
      :quote-for-edit="quote"
    />
    <input-text-area-quote
      placeholder="”ციტატა ქართულ ენაზე”"
      name="quote_name_ka"
      v-model="quoteData.quote_name_ka"
      type="text"
      language="ქარ"
      rules="required|georgian-text"
      :error="errors.quote_name_ka"
      :quote-for-edit="quote"
    />
    <input-picture-quote-edit
      name="picture"
      rules="image"
      :error="errors.picture"
      v-model="quoteData.picture"
      :existing-quote-picture="quote.picture"
    />

    <span v-if="serverErrorMessage" class="text-red mt-7 block">{{ serverErrorMessage }}</span>

    <button-base class="bg-red w-full mt-7 py-2.5 text-xl">
      {{ $t('texts.save_changes') }}
    </button-base>
  </ValidationForm>
</template>
<script setup>
import InputTextAreaQuote from '@/components/ui/InputTextAreaQuote.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { Form as ValidationForm } from 'vee-validate'
import { reactive, ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/useMovieStore'
import InputPictureQuoteEdit from '@/components/ui/InputPictureQuoteEdit.vue'
import { updateQuote } from '@/services/api/quotes'

const props = defineProps({
  quote: {
    required: true,
    type: Object
  },
  movieId: {
    required: true,
    type: Number
  }
})

const modalStore = useModalStore()

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const serverErrorMessage = ref('')

const quoteData = reactive({
  quote_name_en: props.quote.name.en,
  quote_name_ka: props.quote.name.ka,
  picture: null,
  movie_id: props.movieId
})

const handleSubmit = async () => {
  await updateQuote(quoteData, props.quote.id)
    .then((response) => {
      if (response.status === 200) {
        modalStore.toggleModalVisibility('quoteEditModal')

        isMovieUpdated.value = true
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