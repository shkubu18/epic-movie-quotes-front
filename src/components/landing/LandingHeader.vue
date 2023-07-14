<template>
  <header class="flex justify-between px-16 py-7">
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex">
      <language-switcher />
      <button-base @click="toggleModalVisibility('registerModal')" class="bg-red mr-3.5">
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
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>