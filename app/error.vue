<script setup lang="ts">
import type { NuxtError } from '#app'
import { zh_cn } from '@nuxt/ui/locale'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UApp :locale="zh_cn">
    <AppSiteHeader />

    <UError :error="error" />

    <AppSiteFooter />
  </UApp>
</template>

<style scoped>

</style>
