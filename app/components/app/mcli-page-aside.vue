<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'

const { data: navigation } = await useAsyncData(`docs-mcli-navigation`, () => {
  return queryCollectionNavigation('docsMcli').where('published', '=', true).order('index', 'ASC')
})

const links = ref<PageLink[]>([
  {
    label: 'Minecraft 中文 Wiki',
    to: 'https://zh.minecraft.wiki/',
    icon: 'vscode-icons:file-type-minecraft',
    target: '_blank',
  },
  {
    label: 'BMCLAPI 文档',
    to: 'https://bmclapidoc.bangbang93.com/#',
    icon: 'vscode-icons:folder-type-docs',
    target: '_blank',
  },
])
</script>

<template>
  <UPageAside :ui="{ container: 'space-y-6' }">
    <UContentNavigation
      :navigation="navigation![0]!.children![0]!.children"
      highlight
      :collapsible="false"
    />

    <UPageLinks title="外部链接" :links />
  </UPageAside>
</template>

<style scoped></style>
