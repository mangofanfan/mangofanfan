<script setup lang="ts">
import type { PageFeatureProps } from '@nuxt/ui'

const features = ref<PageFeatureProps[]>([
  {
    title: 'Bilibili',
    description: '@芒果帆帆w',
    icon: 'ant-design:bilibili-outlined',
    to: 'https://space.bilibili.com/354535460',
    target: '_blank'
  },
  {
    title: 'GitHub',
    description: '@mangofanfan',
    icon: 'ant-design:github-filled',
    to: 'https://github.com/mangofanfan',
    target: '_blank'
  },
  {
    title: '知乎',
    description: '@芒果帆帆',
    icon: 'ant-design:zhihu-outlined',
    to: 'https://www.zhihu.com/people/mang-guo-fan-fan',
    target: '_blank'
  }
])

const title = '芒果帆帆'
const description = '芒果帆帆是谁呢？'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/me'
})
</script>

<template>
  <div class="me-page">
    <UPageHero
      title="芒果帆帆"
      description="芒果客栈的主理人"
    >
      <NuxtImg
        class="rounded-lg shadow-2xl"
        src="/images/background.png"
      />
    </UPageHero>

    <UPageSection
      title="社交媒体"
      description="从以下渠道关注芒果客栈的最新情报"
      :features
    />
  </div>
</template>

<style scoped>

</style>
