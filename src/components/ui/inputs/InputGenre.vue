<template>
  <slot />
  <div class="relative mb-5 cursor-pointer">
    <div
      :class="{
        'w-full p-2.5 text-white border rounded flex justify-between items-center border-crud-input-gray overflow-x-scroll scrollbar-none': true,
        'border-red': error,
        'border-green': !error && chosenGenres.length > 0
      }"
      @click="toggleGenres"
    >
      <div class="flex">
        <label class="lg:text-xl cursor-pointer" v-if="chosenGenres.length < 1" for="genres">
          ჟანრები/Genres
        </label>
        <div
          class="flex items-center whitespace-nowrap bg-gray-500 text-white py-1 px-1.5 text-sm mr-1.5 rounded-sm"
          v-for="chosenGenre in chosenGenres"
          :key="chosenGenre.id"
        >
          <span>{{ chosenGenre.name }}</span>
          <icon-genre-remove
            @click.stop="removeChosenGenre(chosenGenre.name, chosenGenre.id)"
            class="cursor-pointer ml-2"
          />
        </div>
      </div>
      <div class="ml-3">
        <icon-input-valid v-if="!error && chosenGenres.length > 0" />
        <icon-input-invalid v-if="error" />
      </div>
    </div>
    <ul
      class="absolute top-12 z-10 h-60 w-60 rounded-lg overflow-y-scroll left-0 bg-dark-blue scrollbar-none"
      v-if="isGenresDropped && genresList.length !== 0"
    >
      <li
        v-for="genre in genresList"
        :key="genre.id"
        class="py-2.5 cursor-pointer px-3 lg:text-lg hover:bg-darker-blue duration-300 border-b-2 border-darker-blue"
        @click="addChosenGenre(genre.id, genre.name)"
      >
        {{ genre.name }}
      </li>
    </ul>
    <ErrorMessage name="genres" class="text-red block mt-2" />
  </div>
</template>
<script setup>
import IconGenreRemove from '@/components/icons/movies/IconGenreRemove.vue'
import IconInputValid from '@/components/icons/validation/IconInputValid.vue'
import { ErrorMessage } from 'vee-validate'
import IconInputInvalid from '@/components/icons/validation/IconInputInvalid.vue'
import { ref } from 'vue'

defineProps({
  error: {
    required: false,
    type: String,
    default: ''
  },
  chosenGenres: {
    required: true,
    type: Array
  },
  genresList: {
    required: true,
    type: Array
  }
})

const isGenresDropped = ref(false)

const toggleGenres = () => {
  isGenresDropped.value = !isGenresDropped.value
}

const emits = defineEmits(['addChosenGenre', 'removeChosenGenre'])

const addChosenGenre = (genreId, genreName) => {
  emits('addChosenGenre', genreId, genreName)
}

const removeChosenGenre = (genreName, genreId) => {
  emits('removeChosenGenre', genreName, genreId)
}
</script>