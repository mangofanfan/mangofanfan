<script setup lang="ts">
const rawCode = ref(`func hello() {
    print("Hello world from MCFPP & VS Code ! ~");
}`)

const title = '适用于 MCFPP 的 VS Code 扩展'
const description = 'MCFPP 是一款为 Minecraft Java 版数据包开发所设计的高级编程语言，这个扩展则为 Visual Studio Code 提供了该语言的高级功能。'
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://mango.js.cn/mcfpp-extension'
})
</script>

<template>
  <div class="mcfpp-extension-page">
    <UPageHero
      headline="BETA"
      title="适用于 VS Code 的 MCFPP 语言扩展"
      description="为 Visual Studio Code 提供 MCFPP 项目创建、语义高亮、代码补全与数据包产物构建。"
      :links="[
        {
          label: '开始使用',
          icon: 'lucide:play',
          to: '/docs/mcfpp-vscode-extension/start',
          target: '_blank'
        },
        {
          label: 'GitHub',
          icon: 'lucide:github',
          to: 'https://github.com/mangofanfan/mcfpp-vscode-extension',
          target: '_blank',
          variant: 'subtle'
        }
      ]"
      orientation="horizontal"
    >
      <div class="space-y-6">
        <CodeBlock
          lang="mcfpp"
          filename="src/example.mcfpp"
          :code="rawCode"
        />

        <CodeBlock
          lang="mcfunction"
          code="/function example/example:hello"
        />
      </div>
    </UPageHero>
  </div>
</template>

<style scoped>

</style>
