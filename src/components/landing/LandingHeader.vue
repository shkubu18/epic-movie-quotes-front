<template>
  <header class="flex items-center justify-between px-5 md:px-16 py-7">
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex">
      <language-switcher />
      <button-base @click="toggleModalVisibility('registerModal')" class="bg-red mr-2.5 md:mr-3.5">
        {{ $t('auth.sign_up') }}
      </button-base>
      <button-base @click="toggleModalVisibility('loginModal')" class="border-2">
        {{ $t('auth.login') }}
      </button-base>
    </div>
  </header>
</template>
<script setup>
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>