<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    scope?: string
  }>(),
  { scope: '/images' }
)
</script>

<template>
  <nuxt-img class="block border border-fan-800 rounded-xl object-cover" :src="`${scope}/${src}`" />
</template>

<style scoped></style>
