<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'
import type { TocLink } from '@nuxt/content'

const { data: navigation } = useAsyncData('blog-navigation', async () => {
  return queryCollectionNavigation('blog').where('published', '=', true).order('date', 'DESC')
})

const links = ref<PageLink[]>([
  {
    label: '南京邮电大学',
    icon: 'lucide:university',
    to: 'https://njupt.edu.cn/',
    target: '_blank',
  },
  {
    label: '南京市东山高级中学',
    icon: 'lucide:school',
    to: 'http://dsgjzx.jnjy.net.cn/',
    target: '_blank',
  },
  {
    label: '南京市将军山中学',
    icon: 'lucide:school',
    to: 'http://jjszx.jnjy.net.cn/',
    target: '_blank',
  },
  {
    label: '南京市将军山小学',
    icon: 'lucide:school',
    to: 'http://jjsxx.jnjy.net.cn/',
    target: '_blank',
  },
])

const tocLinks = ref<TocLink[]>([])
provide('set-toc-links', (links: TocLink[]) => (tocLinks.value = links))
provide('clear-toc-links', () => (tocLinks.value = []))
</script>

<template>
  <UPage class="blog-layout">
    <template #left>
      <UPageAside :ui="{ container: 'space-y-6' }">
        <UContentNavigation :collapsible="false" :navigation />

        <UPageLinks title="外部链接" :links />

        <UCard title="芒果 Feed" :ui="{ header: () => 'py-2 px-3', body: () => 'p-1 space-x-1' }">
          <UButton color="info" variant="ghost" to="/rss.xml" target="_blank">RSS</UButton>
          <UButton color="info" variant="ghost" to="/atom.xml" target="_blank">ATOM</UButton>
          <UButton color="info" variant="ghost" to="/feed.json" target="_blank">JSON</UButton>
        </UCard>
      </UPageAside>
    </template>

    <template #right>
      <UPageAside :ui="{ container: 'space-y-6' }">
        <UContentToc
          v-if="tocLinks.length > 0"
          :links="tocLinks"
          highlight
          highlight-variant="circuit"
        />
      </UPageAside>
    </template>

    <slot />
  </UPage>
</template>

<style scoped></style>
