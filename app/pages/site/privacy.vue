<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { data: page } = useAsyncData('site-privacy', async () => {
  return await queryCollection('site').path('/site/privacy').first()
})

const title = '隐私政策'
const description = '这是芒果客栈的隐私政策。当前版本为 2026 年 10 月 16 日更新的第 1 版。'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/site/privacy',
  ogType: 'website',
})
</script>

<template>
  <div class="site-privacy-page pt-6">
    <h1 class="text-3xl">隐私政策</h1>
    <hr />

    <ContentRenderer :value="page!" />
  </div>
</template>

<style scoped></style>
