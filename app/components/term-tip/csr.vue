<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'CSR'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">Client Side Render，客户端渲染。</p>
      <p class="font-misans">
        网页的构建产物主要为 JavaScript，在访客的浏览器中产生 HTML 结构，再填充到页面。
      </p>
      <p class="font-misans">
        此模式下，服务器压力小（只需托管静态文件），压力给到用户的浏览器，且首屏加载时长难以控制。
      </p>
      <p class="font-misans">这是 Vue 的默认渲染与部署模式。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
