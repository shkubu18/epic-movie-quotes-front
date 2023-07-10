<template>
  <Field
    type="file"
    id="picture"
    @change="handleFileInputChange"
    :rules="rules"
    :name="name"
    class="hidden"
  />
  <div class="w-full h-500 relative">
    <img
      v-if="existingQuotePicture && !modelValue"
      :src="apiUrlForPictures + existingQuotePicture"
      alt="Selected Image"
      class="h-full w-full mb-2 object-cover"
    />
    <img
      v-else
      :src="selectedFileUrl"
      alt="Selected Image"
      class="h-full w-full mb-2 object-cover"
    />
    <div
      class="absolute border-none rounded-xl p-4 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 flex items-center justify-center flex-col bg-transparent-black w-fit h-fit"
    >
      <label class="whitespace-nowrap flex flex-col items-center cursor-pointer" :for="name">
        <icon-picture class="mb-2" />
        Change Photo
      </label>
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
  existingQuotePicture: {
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

const setSelectedFile = (file) => {
  if (file.type.includes('image/')) {
    emits('update:modelValue', file)
    selectedFileUrl.value = URL.createObjectURL(file)
  }
}
</script>