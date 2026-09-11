<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: 'Node.js 项目结构',
  description: 'Node.js 项目的基本结构包含什么呢？',
})

const { data: package_json_ast } = await useAsyncData('project-package-json', () =>
  $fetch('/api/markdown/project/package-json')
)

const { data: gitignore_ast } = await useAsyncData('gitignore-json', () =>
  $fetch('/api/markdown/project/gitignore')
)

const { data: readme_md_ast } = await useAsyncData('readme-md', () =>
  $fetch('/api/markdown/project/readme')
)
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <card extraClass="px-5 py-3">
      <fan-h2>Node.js 项目结构</fan-h2>
      <fan-hr />
      <prose-p>
        Node.js 是一个服务端 <term-tip-javascript /> 运行时，改变了传统上 JavaScript
        只能在浏览器中运行的处境。
      </prose-p>
      <prose-p>
        于是，开发者们可以使用 JavaScript 更方便快速地开发以往更加麻烦的功能，包括当今的众多 AI
        Harness。
      </prose-p>
    </card>

    <card extraClass="p-0">
      <workspace-tabs default-tab="package.json">
        <workspace-tab-panel label=".gitignore" icon="git-branch" :content="gitignore_ast" />
        <workspace-tab-panel label="package.json" icon="json" :content="package_json_ast" />
        <workspace-tab-panel label="README.md" icon="markdown" :content="readme_md_ast" />
      </workspace-tabs>
    </card>
  </div>
</template>

<style scoped></style>
