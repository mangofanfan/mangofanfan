<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

const { data: post } = useAsyncData('toys-playground-og', async () => {
  return await queryCollection('toys').path('/toys/playground/og').first()
})

const title = '开放图谱协议分析仪'
const description =
  '开放图谱协议（Open Graph Protocol）规定了一组元数据，用于告诉社交媒体如何生成一个网页的分享信息。这里提供一个分析任何链接在此协议下的分享效果的卡片生成工具。'
useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogImage: {
    url: 'https://mango.js.cn/images/toys/index-og.png',
    type: 'image/png',
  },
})
</script>

<template>
  <UPage v-if="post" class="toy-playground-og-page">
    <template #left>
      <UPageAside class="mt-6">
        <UContentToc :links="post.body.toc!.links" title="开放图谱协议" />
      </UPageAside>
    </template>

    <UPageHeader :title="post.title" :description="post.description" />

    <PlaygroundOgDector class="mt-6" />

    <ContentRenderer :value="post" />
  </UPage>
</template>

<style scoped></style>
