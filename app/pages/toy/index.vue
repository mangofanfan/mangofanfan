<script setup lang="ts">
import type { BlogPostProps } from '@nuxt/ui'

definePageMeta({
  layout: 'toy',
})

const title = '芒果的神秘妙妙玩具'
const description = '一些奇妙的：冷知识 / 热知识 / 温知识 / 小工具 / 小道具 / 小玩具 / ...'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/toy',
  ogImage: { url: 'https://mango.js.cn/images/toys/index-taki.png', type: 'image/png' },
})

const knowledgePosts = ref<BlogPostProps[]>([
  {
    title: '开源许可证',
    description: '关于开源许可证的你所需要知道的信息',
    image: '/images/toys/index-license.png',
    to: '/toy/knowledge/license',
  },
])
const backupPosts = ref<BlogPostProps[]>([
  {
    title: 'TextMate 语法',
    description: '编写语法的一些经验和教训',
    badge: '翻译',
    image: '/images/toys/index-textmate.png',
    to: '/toy/backup/textmate',
  },
])
const playgroundPosts = ref<BlogPostProps[]>([
  {
    title: '开放图谱协议分析仪',
    description: '检查链接的理想最佳显示效果',
    image: '/images/toys/index-og.png',
    to: '/toy/playground/og',
  },
])
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside>
        <working />
      </UPageAside>
    </template>

    <UPageHero
      headline="芒果祈愿中……"
      title="神秘妙妙玩具"
      description="一些奇妙的：冷知识 / 热知识 / 温知识 / 小工具 / 小道具 / 小玩具 / ..."
      orientation="horizontal"
    >
      <NuxtImg
        src="/images/toys/index-taki.png"
        class="size-64 rounded-full shadow-2xl ring ring-default"
      />
    </UPageHero>

    <UPageSection title="知识库" description="一些可能你了解得并不清楚的知识">
      <UBlogPosts :posts="knowledgePosts" />
    </UPageSection>

    <UPageSection title="档案馆" description="一些翻译得到的技术文字">
      <UBlogPosts :posts="backupPosts" />
    </UPageSection>

    <UPageSection title="游乐场" description="无需下载，点击即玩！（？）">
      <UBlogPosts :posts="playgroundPosts" />
    </UPageSection>
  </UPage>
</template>

<style scoped></style>
