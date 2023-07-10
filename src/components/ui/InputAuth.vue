<template>
  <div class="mb-5">
    <label class="block mb-2" :for="name">{{ label }}</label>
    <div class="relative">
      <Field
        :class="{
          'w-full p-1.5 text-gray-900 placeholder:text-gray-500 border-3 bg-gray-300 rounded caret-black outline-none': true,
          'border-gray-300 focus:border-gray-400': !error,
          'border-red focus:border-red': error,
          'border-green focus:border-green': !error && hasValue
        }"
        :type="type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="modelValue"
        :rules="rules"
        @input="emits('update:modelValue', $event.target.value)"
      />
      <ErrorMessage :name="name" class="text-red mt-2 block" />
      <icon-valid-input v-if="!error && hasValue" class="absolute right-3 top-3.5 cursor-pointer" />
      <icon-invalid-input v-if="error" class="absolute right-3 top-2.5 cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { computed } from 'vue'
import IconInvalidInput from '@/components/icons/validation/IconInvalidInput.vue'
import IconValidInput from '@/components/icons/validation/IconValidInput.vue'

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  placeholder: {
    required: true,
    type: String
  },
  label: {
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
  }
})

const emits = defineEmits(['update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== ''
})
</script>