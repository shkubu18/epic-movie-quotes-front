<template>
  <main class="min-h-screen bg-darker-blue flex items-center justify-center flex-col text-white">
    <div class="flex items-center justify-center flex-col mb-20">
      <icon-not-found />
      <icon-not-found-circle class="mt-6 mb-10" />
      <h1 class="text-2xl lg:text-5xl font-bold">{{ $t('texts.whoops') }}</h1>
      <p class="lg:text-2xl mt-5 mb-14 text-center">{{ $t('texts.not_found_error_message') }}</p>
      <button-return-home />
    </div>
  </main>
</template>
<script setup>
import IconNotFound from '@/components/icons/notfound/IconNotFound.vue'
import IconNotFoundCircle from '@/components/icons/notfound/IconNotFoundCircle.vue'
import ButtonReturnHome from '@/components/ui/buttons/ButtonReturnHome.vue'
import { onMounted } from 'vue'
import { getLocale } from '@/services/api/localization'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

onMounted(async () => {
  await getLocale().then((response) => {
    if (response.status === 200) {
      locale.value = response.data.locale
    }
  })
})
</script>