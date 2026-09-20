<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'MCP 服务器'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">MCP，全称是 Model Context Protocol 模型上下文协议。</p>
      <p class="font-misans">
        MCP 协议允许 MCP 客户端（智能体）通过约定的 STDIO/HTTP 方法从 MCP
        服务器获取数据、访问资源等，对双方的具体实现、编程语言等无任何限制。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
