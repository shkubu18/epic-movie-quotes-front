<template>
  <div class="mb-6">
    <div
      :class="{
        'w-full px-2.5 lg:p-2.5 text-white h-86 border rounded flex items-start justify-between overflow-y-scroll': true,
        'border-crud-input-gray focus:border-gray-400': !error,
        'border-red': error,
        '!border-green': !error && hasValue
      }"
    >
      <div class="flex items-start flex-col lg:flex-row w-full mt-0.5 lg:mt-0">
        <label
          :class="{
            'cursor-pointer whitespace-nowrap': true,
            'text-base text-crud-input-gray mt-0.5': modelValue.length !== 0,
            'lg:text-xl': modelValue.length === 0
          }"
          :for="name"
        >
          {{ label }}{{ modelValue.length !== 0 ? ':' : null }}
        </label>
        <div class="relative w-full lg:ml-3 mr-10">
          <Field
            as="textarea"
            class="border-none bg-transparent w-full lg:text-lg caret-crud-input-gray outline-none mt-1 lg:m-0 scrollbar-none"
            :type="type"
            :name="name"
            :id="name"
            :rules="rules"
            :value="modelValue"
            @input="emits('update:modelValue', $event.target.value)"
          />
          <icon-input-valid
            v-if="!error && hasValue"
            class="absolute -right-6 top-1.5 cursor-pointer"
          />
          <icon-input-invalid v-if="error" class="absolute -right-6 top-1 cursor-pointer" />
        </div>
      </div>
      <span class="lg:text-xl text-crud-input-gray mt-0.5 lg:mt-0">{{ language }}</span>
    </div>
    <ErrorMessage :name="name" class="text-red mt-2 block" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import IconInputValid from '@/components/icons/validation/IconInputValid.vue'
import IconInputInvalid from '@/components/icons/validation/IconInputInvalid.vue'

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
    type: String,
    default: ''
  },
  language: {
    required: false,
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const hasValue = computed(() => {
  return props.modelValue !== ''
})
</script>