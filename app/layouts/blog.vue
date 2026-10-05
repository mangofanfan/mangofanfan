<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'

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
</script>

<template>
  <UPage class="blog-layout">
    <template #left>
      <UPageAside :ui="{ container: 'space-y-6' }">
        <UContentNavigation :collapsible="false" :navigation />

        <UPageLinks title="外部链接" :links />
      </UPageAside>
    </template>

    <template #right>
      <UPageAside>
        <div id="blog-aside-right" />
      </UPageAside>
    </template>

    <slot />
  </UPage>
</template>

<style scoped></style>
