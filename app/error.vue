<script setup lang="ts">
import type { NuxtError } from '#app'
import { zh_cn } from '@nuxt/ui/locale'

defineProps<{
  error: NuxtError
}>()

const title = '！？错错？！'
const description =
  '芒果客栈被测试程序员整崩溃了，据传该测试手持一瓶牛奶走入了客栈，并要求点一只猫。'
useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
})
</script>

<template>
  <UApp :locale="zh_cn">
    <AppSiteHeader />

    <UError :error="error" />

    <AppSiteFooter />
  </UApp>
</template>

<style scoped></style>
