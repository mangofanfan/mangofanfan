<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const { data: page } = useAsyncData('site-guide', async () => {
  return await queryCollection('site').path('/site/guide').first()
})

const title = '芒果客栈守则'
const description =
  '欢迎来到芒果客栈~在客栈内活动期间，请务必知悉并遵守这些客栈守则，以营造良好的休息氛围哦~'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://mango.js.cn/site/guide',
  ogType: 'website',
})
</script>

<template>
  <div class="site-guide-page pt-6">
    <h1 class="text-3xl">芒果客栈守则</h1>
    <hr />

    <ContentRenderer :value="page!" />
  </div>
</template>

<style scoped></style>
