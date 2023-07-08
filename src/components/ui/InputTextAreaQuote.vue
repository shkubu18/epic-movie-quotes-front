<template>
  <div class="mb-6">
    <div
      :class="{
        'w-full p-2.5 text-white h-86 border-2 rounded flex items-start justify-between': true,
        'border-crud-input-gray focus:border-gray-400': !error,
        'border-red': error,
        '!border-green': !error && hasValue
      }"
    >
      <div class="flex items-start w-full">
        <div class="relative w-full ml-3 mr-10">
          <Field
            as="textarea"
            :class="{
              'border-none bg-transparent placeholder:italic w-full text-2xl caret-crud-input-gray outline-none': true,
              'placeholder:text-white': movie || quoteForEdit
            }"
            :type="type"
            :placeholder="placeholder"
            :name="name"
            :id="name"
            :rules="rules"
            :value="modelValue"
            @input="emits('update:modelValue', $event.target.value)"
          />
          <icon-valid-input
            v-if="!error && hasValue"
            class="absolute -right-6 top-1.5 cursor-pointer"
          />
          <icon-invalid-input v-if="error" class="absolute -right-6 top-1 cursor-pointer" />
        </div>
      </div>
      <span :class="movie || quoteForEdit ? 'text-xl text-crud-input-gray' : 'text-xl'">
        {{ language }}
      </span>
    </div>
    <ErrorMessage :name="name" class="text-red mt-2 block" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import IconValidInput from '@/components/icons/IconValidInput.vue'
import IconInvalidInput from '@/components/icons/IconInvalidInput.vue'

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  placeholder: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  rules: {
    required: true,
    type: String
  },
  modelValue: {
    required: true,
    type: String
  },
  error: {
    required: false,
    type: String
  },
  language: {
    required: false,
    type: String
  },
  movie: {
    required: false,
    type: Object
  },
  quoteForEdit: {
    required: false,
    type: Object
  }
})

const emits = defineEmits(['update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== ''
})
</script>