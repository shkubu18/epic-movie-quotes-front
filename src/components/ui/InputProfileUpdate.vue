<template>
  <div v-if="isInputVisible" class="mb-14 lg:text-xl relative max-w-lg">
    <label class="block mb-2">{{ label }}</label>
    <Field
      :class="{
        'p-3 text-gray-900 placeholder:text-gray-500 pr-11 bg-gray-300 border-3 rounded caret-black outline-none w-full': true,
        'border-gray-300 focus:border-gray-400': !error,
        'border-red focus:border-red': error,
        'border-green focus:border-green': !error && hasValue
      }"
      :type="type"
      :name="name"
      :value="modelValue"
      :rules="rules"
      :placeholder="placeholder"
      @input="emits('update:modelValue', $event.target.value)"
    />
    <ErrorMessage :name="name" class="text-red mt-3 block" />

    <icon-valid-input
      v-if="!error && hasValue"
      class="absolute right-3 top-12 mt-1 lg:mt-0 lg:top-14"
    />
    <icon-invalid-input v-if="error" class="absolute right-3 top-9 lg:top-12 mt-3 lg:mt-1.5" />
  </div>
</template>
<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { computed } from 'vue'
import IconInvalidInput from '@/components/icons/validation/IconInvalidInput.vue'
import IconValidInput from '@/components/icons/validation/IconValidInput.vue'

const props = defineProps({
  isInputVisible: {
    required: true,
    type: Boolean
  },
  label: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  modelValue: {
    required: true,
    type: String
  },
  rules: {
    required: true,
    type: String
  },
  placeholder: {
    required: true,
    type: String
  },
  error: {
    required: true,
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== ''
})
</script>