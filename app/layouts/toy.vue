<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = [
  {
    label: '玩具妙妙屋',
    icon: 'lucide:car',
    to: '/toy',
  },
  {
    label: '知识库',
    icon: 'lucide:book',
    children: [
      {
        label: '开源许可证',
        icon: 'ant-design:copyright-circle-outlined',
        description: '也许你想了解更多关于开源许可证的信息呢？',
        to: '/toy/knowledge/license',
      },
    ],
  },
  {
    label: '工程类',
    icon: 'ant-design:project-outlined',
    children: [
      {
        label: '（🚧施工中）Node.js 项目',
        icon: 'vscode-icons:file-type-node',
        description: '也许你想了解一个 Node.js 项目基本应该长什么样呢？',
        to: '/toy/project/nodejs',
        disabled: true,
      },
    ],
  },
  {
    label: '档案馆',
    icon: 'ant-design:translation-outlined',
    children: [
      {
        label: 'TextMate：一些经验和教训',
        icon: 'ant-design:schedule-outlined',
        description: '“最近我终于编写出了属于自己的 TextMate 语法……”',
        to: '/toy/backup/textmate',
      },
    ],
  },
  {
    label: '游乐场',
    icon: 'ant-design:code-sandbox-outlined',
    children: [
      {
        label: '开放图谱协议分析仪',
        icon: 'lucide:link',
        description: '检查一个链接的理想状态最佳显示效果！',
        to: '/toy/playground/og',
      },
    ],
  },
]

const setANMI = inject('set-additional-navigation-menu-items') as (
  val: NavigationMenuItem[],
) => void
setANMI(items)
</script>

<template>
  <div class="toy-layout">
    <slot />
  </div>
</template>

<style scoped>
.toy-layout {
  padding-top: 48px;
}
</style>
