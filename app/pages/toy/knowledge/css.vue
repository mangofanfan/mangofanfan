<script setup lang="ts">
definePageMeta({
  layout: 'toy',
})

useSeoMeta({
  title: 'CSS 信息中心',
  description: '一些你可能不知道的 CSS 小知识',
})

const { data: selector_ast } = await useAsyncData('css-selector', () =>
  $fetch('/api/markdown/css/selector')
)

const { data: flex_min_width_ast } = await useAsyncData('css-flex', () =>
  $fetch('/api/markdown/css/flex')
)
</script>

<template>
  <div class="css-page flex flex-col gap-y-3">
    <working />
    <workspace-tabs>
      <workspace-tab-panel label="选择器" icon="cursor" :content="selector_ast" />
      <workspace-tab-panel
        label="flex 布局"
        icon="cursor"
        :content="flex_min_width_ast"
        :divide="true"
      />
    </workspace-tabs>
  </div>
</template>

<style scoped></style>
