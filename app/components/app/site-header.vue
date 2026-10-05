<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface Props {
  additionalItems?: NavigationMenuItem[] | null
}

withDefaults(defineProps<Props>(), { additionalItems: null })

const items = ref<NavigationMenuItem[]>([
  {
    label: '芒果帆帆',
    icon: 'lucide:house',
    to: '/me',
  },
  {
    label: '项目导览',
    icon: 'lucide:proportions',
    children: [
      {
        label: '芒果客栈的在线小玩具',
        description: '来玩玩具喵！来玩玩具谢谢喵！',
        to: '/toy',
      },
      {
        label: '适用于 VS Code 的 MCFPP 扩展',
        description: '为 VS Code 提供 MCFPP 语言的高级支持的扩展',
        to: '/mcfpp-extension',
      },
    ],
  },
  {
    label: '芒果日志',
    icon: 'lucide:calendar-range',
    to: '/blog',
  },
  {
    label: 'MCFPP',
    icon: 'vscode-icons:file-type-minecraft',
    children: [
      {
        label: 'MCFPP',
        description: '为 Minecraft 数据包开发所设计的高级编程语言',
        to: '/docs/mcfpp/introduction',
      },
      {
        label: 'MCFPP VS Code 扩展',
        description: '为 VS Code 提供 MCFPP 语言的高级支持的扩展',
        to: '/docs/mcfpp-vscode-extension/start',
      },
    ],
  },
  {
    label: '外部链接',
    icon: 'lucide:link',
    children: [
      {
        label: 'Bilibili',
        description: '@芒果帆帆w',
        icon: 'ant-design:bilibili-outlined',
        to: 'https://space.bilibili.com/354535460',
      },
      {
        label: 'GitHub',
        description: '@mangofanfan',
        icon: 'ant-design:github-filled',
        to: 'https://github.com/mangofanfan',
      },
      {
        label: '知乎',
        description: '@芒果帆帆',
        icon: 'ant-design:zhihu-outlined',
        to: 'https://www.zhihu.com/people/mang-guo-fan-fan',
      },
    ],
  },
])
</script>

<template>
  <UHeader
    title="芒果客栈"
    to="/"
    mode="slideover"
    :ui="{
      root: () => 'h-(--ui-header-height) sticky top-0 z-50',
      container: [
        'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full',
        'bg-default/75 backdrop-blur-sm relative z-5',
      ],
    }"
  >
    <template #title>
      <span class="flex flex-row items-center gap-x-2">
        <span class="text-primary">
          <UIcon name="fan:mango" class="size-8" />
        </span>
        <span class="text-xl font-bold">芒果客栈</span>
      </span>
    </template>

    <template #default>
      <UNavigationMenu :items :ui="{ root: 'z-auto', viewportWrapper: 'z-5' }" />
    </template>

    <template #body>
      <div class="flex flex-col gap-y-6">
        <UNavigationMenu orientation="vertical" highlight :items />

        <UNavigationMenu
          v-if="additionalItems"
          orientation="vertical"
          highlight
          :items="additionalItems"
        />
      </div>
    </template>

    <template #right>
      <UColorModeSelect />
    </template>

    <template #bottom>
      <div
        v-if="additionalItems"
        class="bg-default/75 backdrop-blur-sm border-b border-t border-default relative z-4"
      >
        <UContainer class="flex flex-row items-center">
          <UNavigationMenu highlight :items="additionalItems" :ui="{ root: 'hidden lg:flex' }" />

          <div id="site-header-bottom-extra" class="ml-auto" />
        </UContainer>
      </div>
    </template>
  </UHeader>
</template>

<style scoped></style>
