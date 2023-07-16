<template>
  <div class="absolute top-0 left-0 w-full h-5/6 bg-lighter-black z-50">
    <header class="flex text-white items-center border-b border-default-border-b-color px-10 py-7">
      <icon-arrow-left
        class="cursor-pointer"
        @click="toggleModalVisibility('mobileNewsFeedSearchModal')"
      />
      <span class="ml-6">{{ $t('texts.search') }}</span>
    </header>
    <input
      class="w-full mt-7 pl-12 outline-none caret-white text-white bg-transparent text-xs"
      type="text"
      @keydown.enter="getSearchResult"
      :value="modelValue"
      @input="emits('update:modelValue', $event.target.value)"
      :placeholder="$t('texts.search_long_text', { movieSymbol: '@', quoteSymbol: '#' })"
    />
  </div>
</template>
<script setup>
import IconArrowLeft from '@/components/icons/arrows/IconArrowLeft.vue'
import { useModalStore } from '@/stores/useModalStore'
import { searchQuotes } from '@/services/api/quotes'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])

const router = useRouter()

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { searchingQuotesIsActive } = storeToRefs(newsFeedQuoteStore)

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const getSearchResult = async () => {
  if (props.modelValue.length === 0) {
    toggleModalVisibility('mobileNewsFeedSearchModal')
    searchingQuotesIsActive.value = false
  }

  if (props.modelValue.startsWith('#') || props.modelValue.startsWith('@')) {
    if (props.modelValue.length > 1) {
      await searchQuotes(props.modelValue)
        .then((response) => {
          newsFeedQuoteStore.addSearchedQuotes(response.data.quotes)
        })
        .catch(() => {
          router.replace({ name: '403' })
        })
        .finally(() => {
          toggleModalVisibility('mobileNewsFeedSearchModal')
          emits('update:modelValue', '')
        })
    }
  }
}
</script>