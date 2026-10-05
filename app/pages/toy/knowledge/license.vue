<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { PageCollectionItemBase } from '@nuxt/content'

definePageMeta({
  layout: 'toy',
})

const value = ref<'overview' | 'mit' | 'gpl'>('overview')
const items = ref<TabsItem[]>([
  {
    label: '开源许可证总览',
    value: 'overview',
  },
  {
    label: 'MIT',
    value: 'mit',
  },
  {
    label: 'GPL',
    value: 'gpl',
  },
])

const post = ref<PageCollectionItemBase | null>(null)
watch(
  value,
  async (newValue) =>
    (post.value = await queryCollection('toys').path(`/toys/license/${newValue}`).first()),
  { immediate: true },
)

const title = '关于开源许可证，你可能不知道的一些信息'
const description =
  '开发者使用许可证声明他们的产物以及源代码的使用方式，广受欢迎的一种选择是开源许可证。本页面介绍了主流开源许可证的信息。'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogImage: { url: 'https://mango.js.cn/images/toys/index-license.png', type: 'image/png' },
})
</script>

<template>
  <UPage>
    <template #left>
      <UPageAside class="pt-18">
        <UTabs v-model="value" :items :content="false" orientation="vertical" color="neutral" />
      </UPageAside>
    </template>

    <template #right>
      <UPageAside v-if="post" class="pt-12">
        <UContentToc highlight-variant="circuit" highlight :links="post!.body.toc!.links" />
      </UPageAside>
    </template>

    <div v-if="post">
      <div class="flex flex-col items-center pt-6">
        <NuxtImg src="/images/toys/index-license.png" class="rounded-md shadow-2xl max-w-[80%]" />
      </div>

      <UPageHeader :title="post.title" :description="post.description" />

      <ContentRenderer :value="post" />
    </div>
  </UPage>
</template>

<style scoped></style>
