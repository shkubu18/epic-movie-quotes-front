<template>
  <landing-required-modal-list />
  <div class="h-600 md:h-screen bg-black md:bg-gray-950">
    <landing-header />
    <div class="flex items-center justify-center flex-col h-full -mt-14 md:-mt-24">
      <h1
        :class="{
          'text-2xl md:text-6xl w-3/4 text-yellow text-center font-bold !leading-normal mb-6 font-[montserrat-bold]': true,
          'md:w-2/5': $i18n.locale === 'en',
          'md:w-3/5': $i18n.locale === 'ka'
        }"
      >
        {{ $t('landing.find_any_quote_in_millions_of_movie_lines') }}
      </h1>
      <button-base
        @click="toggleModalVisibility('loginModal')"
        class="bg-red text-base md:text-xl py-2.5"
      >
        {{ $t('texts.get_started') }}
      </button-base>
    </div>
  </div>
  <landing-quotes />
  <landing-footer />
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import LandingQuotes from '@/components/landing/LandingQuotes.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import { useModalStore } from '@/stores/useModalStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LandingRequiredModalList from '@/components/landing/LandingRequiredModalList.vue'

const route = useRoute()

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

onMounted(() => {
  if (route.query.token) {
    modalStore.toggleModalVisibility('passwordUpdateModal')
  }
})
</script>