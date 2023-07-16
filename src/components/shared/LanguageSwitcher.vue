<template>
  <div class="flex items-center mr-3.5 md:mr-9 text-white relative">
    <div class="cursor-pointer flex items-center" @click="toggleLanguageMenu">
      <span class="mr-3 capitalize">
        {{
          $i18n.locale === 'en'
            ? $t('texts.language_switcher.en')
            : $t('texts.language_switcher.ka')
        }}
      </span>
      <IconArrowDown width="12" height="8" />
    </div>
    <span
      @click="setLanguage()"
      v-if="isLanguageMenuOpen"
      class="absolute z-50 -bottom-16 -left-5 bg-black w-fit rounded-md p-2.5 hover:bg-gray-200 hover:text-gray-500 duration-500 cursor-pointer"
    >
      {{
        $i18n.locale !== 'en'
          ? $t('texts.language_switcher.english')
          : $t('texts.language_switcher.georgian')
      }}
    </span>
  </div>
</template>

<script setup>
import IconArrowDown from '@/components/icons/arrows/IconArrowDown.vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { changeLanguage, getLocale } from '@/services/api/localization'
import { setLocale } from '@vee-validate/i18n'

const { locale } = useI18n()

const isLanguageMenuOpen = ref(false)

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

const getLanguage = () => {
  return locale.value === 'en' ? 'ka' : 'en'
}

const setLanguage = async () => {
  const language = getLanguage()

  await changeLanguage(language).then((response) => {
    if (response.status === 200) {
      locale.value = response.data.locale
      setLocale(response.data.locale)
      isLanguageMenuOpen.value = false
    }
  })
}

onMounted(async () => {
  await getLocale().then((response) => {
    if (response.status === 200) {
      locale.value = response.data.locale
      setLocale(response.data.locale)
    }
  })
})
</script>