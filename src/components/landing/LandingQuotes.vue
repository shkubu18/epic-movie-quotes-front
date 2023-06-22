<template>
  <landing-section class="bg-interstellar">
    <landing-article class="mb-52">
      <landing-heading>“You have to leave something <br />behind to go forward”</landing-heading>
      <landing-span>Interstellar, 2014</landing-span>
    </landing-article>
  </landing-section>
  <landing-section class="bg-the-royal-tenenbaums">
    <landing-article>
      <landing-heading
        >“I think we’re just gonna have <br />to be secretly in love with earch other <br />and
        leave it that”
      </landing-heading>
      <landing-span>The Royal Tenenbaums, 2001</landing-span>
    </landing-article>
  </landing-section>
  <landing-section class="bg-lord-of-rings">
    <landing-article class="mt-52">
      <landing-heading>
        “A hunted man sometimes wearies of <br />distrust and longs for friendship.”
      </landing-heading>
      <landing-span>The Lord of the Rings, 2003</landing-span>
    </landing-article>
  </landing-section>
</template>
<script setup>
import LandingSection from '@/components/landing/LandingSection.vue'
import LandingHeading from '@/components/landing/LandingHeading.vue'
import LandingArticle from '@/components/landing/LandingArticle.vue'
import LandingSpan from '@/components/landing/LandingSpan.vue'
</script>