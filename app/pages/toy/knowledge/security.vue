<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { PageCollectionItemBase } from '@nuxt/content'

definePageMeta({
  layout: 'toy',
})

const value = ref<'overview' | 'ca-20261020' | 'php-20261020'>('overview')
const items = ref<TabsItem[]>([
  {
    label: '概览',
    value: 'overview',
  },
  {
    label: 'PHP PHP2Shell',
    value: 'php-20261020',
  },
  {
    label: 'eMudhra CA',
    value: 'ca-20261020',
  },
])

const post = ref<PageCollectionItemBase | null>(null)
watch(
  value,
  async (newValue) =>
    (post.value = await queryCollection('toys').path(`/toys/security/${newValue}`).first()),
  { immediate: true },
)

const title = '你应该及时知晓的安全性问题'
const description =
  '软件工程和计算机领域的安全攻防从未停止，也许你应该对这些领域的现况保持关注，尤其是如果你正在从事有关的工作时。'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  ogImage: { url: 'https://mango.js.cn/images/toys/index-security.png', type: 'image/png' },
  ogUrl: 'https://mango.js.cn/toy/knowledge/security',
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
        <NuxtPicture
          src="/images/toys/index-security.png"
          class="w-full flex flex-col items-center"
          :img-attrs="{ class: 'rounded-md shadow-2xl max-w-[80%]' }"
        />
      </div>

      <UPageHeader :title="post.title" :description="post.description" />

      <ContentRenderer :value="post" />
    </div>
  </UPage>
</template>

<style scoped></style>
