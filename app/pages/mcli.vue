<script setup lang="ts">
const title = 'MCLI - Minecraft Command-Line Interface'
const description =
  'MCLI 是一个为 Minecraft Java 版版本管理所设计的命令行工具，支持一行命令安装任意游戏版本。未来还将支持安装服务器和管理模组功能。'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/mcli',
})
</script>

<template>
  <div class="mcli-page">
    <UPageHero
      headline="ALPHA"
      title="MCLI - Minecraft Command-Line Interface"
      description="一个为 Minecraft Java 版版本管理所设计的命令行工具，支持一行命令安装任意游戏版本。未来还将支持安装服务器和管理模组功能。"
      :links="[
        {
          label: '开始使用',
          icon: 'lucide:play',
          to: '/docs/mcli/concept/start',
        },
        {
          label: 'GitHub',
          icon: 'lucide:github',
          to: 'https://github.com/mangofanfan/mcli',
          target: '_blank',
          variant: 'subtle',
        },
      ]"
      orientation="horizontal"
    >
      <div class="space-y-6">
        <CodeBlock lang="shell" code="uv tool install mmccli" />
        <CodeBlock lang="shell" code="mmccli add --minecraft 26.2 --forge latest" />
      </div>
    </UPageHero>
  </div>
</template>

<style scoped></style>
