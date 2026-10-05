<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'

const { data: navigation1 } = await useAsyncData(`docs-mcfpp-navigation`, () => {
  return queryCollectionNavigation('docsMcfpp').where('published', '=', true).order('index', 'ASC')
})

const { data: navigation2 } = await useAsyncData(`docs-mcfpp-vscode-extension-navigation`, () => {
  return queryCollectionNavigation('docsMcfppVscodeExtension').where('published', '=', true).order('index', 'ASC')
})

const links = ref<PageLink[]>([
  {
    label: 'Minecraft 中文 Wiki',
    to: 'https://zh.minecraft.wiki/',
    icon: 'vscode-icons:file-type-minecraft',
    target: '_blank'
  },
  {
    label: '香草图书馆',
    to: 'https://vanillalibrary.mcfpp.top/datapack-index/',
    icon: 'lucide:flower-2',
    target: '_blank'
  },
  {
    label: 'MCFPP API',
    to: 'https://mcfpp.top/zh/',
    icon: 'lucide:flower-2',
    target: '_blank'
  },
  {
    label: 'VS Code 扩展开发手册',
    to: 'https://code.visualstudio.com/api',
    icon: 'devicon:vscode',
    target: '_blank'
  },
  {
    label: 'VS Code 中文扩展开发手册',
    to: 'https://liiked.github.io/VS-Code-Extension-Doc-ZH/',
    icon: 'devicon:vscode',
    target: '_blank'
  }
])
</script>

<template>
  <UPageAside :ui="{ container: 'space-y-6' }">
    <UContentNavigation
      :navigation="navigation1![0]!.children"
      highlight
      :collapsible="false"
    />

    <UContentNavigation
      :navigation="navigation2![0]!.children"
      highlight
      :collapsible="false"
    />

    <UPageLinks
      title="外部链接"
      :links
    />
  </UPageAside>
</template>

<style scoped>

</style>
