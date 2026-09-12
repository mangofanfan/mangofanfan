<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: 'Node.js 项目结构',
  description: 'Node.js 项目的基本结构包含什么呢？',
})

const { data: folder_vscode_ast } = await useAsyncData('project-folder-vscode', () =>
  $fetch('/api/markdown/project/folder-vscode')
)

const { data: folder_node_modules_ast } = await useAsyncData('project-folder-node-modules', () =>
  $fetch('/api/markdown/project/folder-node-modules')
)

const { data: gitignore_ast } = await useAsyncData('project-gitignore', () =>
  $fetch('/api/markdown/project/gitignore')
)

const { data: package_json_ast } = await useAsyncData('project-package-json', () =>
  $fetch('/api/markdown/project/package-json')
)

const { data: tsconfig_json_ast } = await useAsyncData('project-tsconfig-json', () =>
  $fetch('/api/markdown/project/tsconfig-json')
)

const { data: changelog_md_ast } = await useAsyncData('project-changelog-md', () =>
  $fetch('/api/markdown/project/changelog')
)

const { data: license_ast } = await useAsyncData('project-license', () =>
  $fetch('/api/markdown/project/license')
)

const { data: readme_md_ast } = await useAsyncData('project-readme-md', () =>
  $fetch('/api/markdown/project/readme')
)
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <card extraClass="px-5 py-3">
      <fan-h2>Node.js 项目结构</fan-h2>
      <fan-hr />
      <prose-p>
        <term-tip-nodejs /> 是一个服务端 <term-tip-javascript /> 运行时，改变了传统上 JavaScript
        只能在浏览器中运行的处境。
      </prose-p>
      <prose-p>于是，开发者们可以使用 JavaScript 更方便快速地开发以往更加麻烦的功能。</prose-p>
      <prose-ul>
        <prose-li>Node.js 不是一门语言，而是一个运行时。真正运行的语言是 JavaScript。</prose-li>
        <prose-li>
          Node.js 的包管理器是 npm（官方）、pnpm、yarn 等，包中央仓库是
          <prose-a href="https://www.npmjs.com/">npmjs.com</prose-a> 。
        </prose-li>
      </prose-ul>
    </card>

    <workspace-tabs default-tab="package.json">
      <workspace-tab-panel label=".vscode" icon="folder" :content="folder_vscode_ast" />
      <workspace-tab-panel label="node_modules" icon="folder" :content="folder_node_modules_ast" />
      <workspace-tab-panel
        label=".gitignore"
        icon="git-branch"
        :content="gitignore_ast"
        :divide="true"
      />
      <workspace-tab-panel label="package.json" icon="json" :content="package_json_ast" />
      <workspace-tab-panel label="tsconfig.json" icon="code" :content="tsconfig_json_ast" />
      <workspace-tab-panel
        label="CHANGELOG.md"
        icon="markdown"
        :content="changelog_md_ast"
        :divide="true"
      />
      <workspace-tab-panel
        label="LICENSE"
        icon="copyright"
        icon-set="fa6-solid"
        :content="license_ast"
      />
      <workspace-tab-panel label="README.md" icon="markdown" :content="readme_md_ast" />
    </workspace-tabs>
  </div>
</template>

<style scoped></style>
