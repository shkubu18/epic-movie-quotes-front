<template>
  <header class="flex justify-between items-center px-16 py-7 bg-dark-blue">
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex items-center">
      <icon-notification class="mr-9" />
      <language-switcher />
      <button-base @click="logoutUser" class="border-2">Log out</button-base>
    </div>
  </header>
</template>
<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { logout } from '@/services/api/auth'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/useMovieStore'

const router = useRouter()

const movieStore = useMovieStore()

const logoutUser = async () => {
  await logout().then((response) => {
    if (response.status === 200) {
      router.replace({ name: 'landing' })

      setTimeout(() => {
        movieStore.resetStore()
      }, 1000)
    }
  })
}
</script>