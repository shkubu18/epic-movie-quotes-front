<template>
  <div class="mb-6">
    <div
      :class="{
        'w-full p-2.5 text-white border rounded flex items-center justify-between': true,
        'border-crud-input-gray focus:border-gray-400': !error,
        'border-red': error,
        '!border-green': !error && hasValue
      }"
    >
      <div class="flex items-center w-full">
        <label
          :class="`cursor-pointer whitespace-nowrap ${
            modelValue.length !== 0 ? 'text-base text-crud-input-gray' : 'lg:text-xl'
          }`"
          :for="name"
        >
          {{ label }}{{ modelValue.length !== 0 ? ':' : null }}
        </label>
        <div class="relative w-full ml-3 mr-10">
          <Field
            class="border-none bg-transparent w-full lg:text-xl caret-crud-input-gray outline-none"
            :type="type"
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
          <icon-invalid-input
            v-if="error"
            class="absolute -right-6 top-0.5 lg:top-1 cursor-pointer"
          />
        </div>
      </div>
      <span class="lg:text-xl text-crud-input-gray">{{ language }}</span>
    </div>
    <ErrorMessage :name="name" class="text-red mt-2 block" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import IconValidInput from '@/components/icons/validation/IconValidInput.vue'
import IconInvalidInput from '@/components/icons/validation/IconInvalidInput.vue'

const props = defineProps({
  name: {
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
  },
  language: {
    required: false,
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== ''
})
</script>