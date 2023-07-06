<template>
  <Field
    type="file"
    id="picture"
    @change="handleFileInputChange"
    :rules="rules"
    :name="name"
    class="hidden"
  />
  <div
    :class="{
      'flex items-center border-2 h-86 border-crud-input-gray rounded p-4 text-center cursor-pointer': true,
      '!h-48': modelValue || existingMoviePicture,
      'border-red': error,
      'border-green': !error && (modelValue || existingMoviePicture)
    }"
    @dragover="handleDragOver"
    @drop="handleFileDrop"
  >
    <div class="flex items-center" v-if="!modelValue && !existingMoviePicture">
      <icon-picture />
      <span class="text-xl ml-2">Drag & drop your image here or</span>
      <label class="bg-purple-950 text-lg p-3 rounded-sm ml-5" :for="name">Choose file</label>
    </div>
    <div
      class="flex h-full w-full items-center justify-center"
      v-if="modelValue || existingMoviePicture"
    >
      <img
        v-if="existingMoviePicture && !modelValue"
        :src="apiUrlForPictures + existingMoviePicture"
        alt="Selected Image"
        class="h-full w-1/2 mb-2 object-cover"
      />
      <img
        v-else
        :src="selectedFileUrl"
        alt="Selected Image"
        class="h-full w-1/2 mb-2 object-cover"
      />
      <div class="flex flex-col w-1/2 items-center">
        <h3 class="text-yellow text-lg font-bold">REPLACE PHOTO</h3>
        <div class="flex items-center justify-center my-5">
          <icon-picture />
          <span class="text-xl ml-2">Drag & drop your image here or</span>
        </div>
        <label class="bg-purple-950 text-lg p-3 rounded-sm ml-5 w-fit" :for="name">
          Choose file
        </label>
      </div>
    </div>
  </div>
  <ErrorMessage :name="name" class="text-red mt-2 block" />
</template>

<script setup>
import { ref } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import IconPicture from '@/components/icons/IconPicture.vue'

defineProps({
  name: {
    required: true,
    type: String
  },
  error: {
    required: false,
    type: String
  },
  rules: {
    required: true,
    type: String
  },
  modelValue: {
    required: true,
    type: [Object, null, String]
  },
  existingMoviePicture: {
    required: false,
    type: String
  }
})

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const emits = defineEmits(['update:modelValue'])
const selectedFileUrl = ref('')

const handleFileInputChange = (event) => {
  const file = event.target.files[0]
  if (file) setSelectedFile(file)
}

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleFileDrop = (event) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]
  if (file) setSelectedFile(file)
}

const setSelectedFile = (file) => {
  if (file.type.includes('image/')) {
    emits('update:modelValue', file)
    selectedFileUrl.value = URL.createObjectURL(file)
  }
}
</script>