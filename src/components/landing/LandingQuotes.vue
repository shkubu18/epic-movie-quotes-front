<template>
  <landing-section class="bg-interstellar">
    <landing-article class="mb-52">
      <landing-heading>{{ $t('landing.quotes.interstellar_quote') }}</landing-heading>
      <landing-span>{{ $t('landing.movies.interstellar') }}, 2014</landing-span>
    </landing-article>
  </landing-section>
  <landing-section class="bg-the-royal-tenenbaums">
    <landing-article>
      <landing-heading>{{ $t('landing.quotes.the_royal_tenenbaums_quote') }}</landing-heading>
      <landing-span>{{ $t('landing.movies.the_royal_tenenbaums') }}, 2001</landing-span>
    </landing-article>
  </landing-section>
  <landing-section class="bg-lord-of-rings">
    <landing-article class="mt-52">
      <landing-heading>{{ $t('landing.quotes.the_lord_of_the_rings_quote') }}</landing-heading>
      <landing-span>{{ $t('landing.movies.the_lord_of_the_rings') }}, 2003</landing-span>
    </landing-article>
  </landing-section>
</template>
<script setup>
import LandingSection from '@/components/landing/LandingSection.vue'
import LandingHeading from '@/components/landing/LandingHeading.vue'
import LandingArticle from '@/components/landing/LandingArticle.vue'
import LandingSpan from '@/components/landing/LandingSpan.vue'
</script>