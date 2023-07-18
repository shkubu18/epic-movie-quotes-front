<template>
  <button-base
    @click="authWithGoogle()"
    class="py-2 border-2 border-gray-400 w-full mt-5 flex items-center justify-center"
  >
    <icon-google class="mr-2" />
    {{ $t('auth.sign_in_with_google') }}
  </button-base>
</template>
<script setup>
import IconGoogle from '@/components/icons/IconGoogle.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { authWithGoogle } from '@/services/api/oauth'
</script>