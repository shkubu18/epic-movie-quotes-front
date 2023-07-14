<template>
  <div :class="{ 'text-xl': true, 'mb-14': !googleUser }">
    <label class="block mb-2">{{ label }}</label>
    <div class="flex items-center justify-between">
      <input
        class="p-3 text-gray-900 placeholder:text-gray-500 bg-gray-300 rounded caret-black outline-none w-full max-w-lg"
        :value="inputValue"
        :type="type"
        disabled
      />
      <span
        v-if="!googleUser"
        @click="emits('editButtonClicked')"
        class="text-xl text-gray-200 cursor-pointer"
      >
        {{ $t('texts.edit') }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    required: true,
    type: String
  },
  inputValue: {
    required: false,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  googleUser: {
    required: false,
    type: Boolean
  }
})

const emits = defineEmits(['editButtonClicked'])
</script>
