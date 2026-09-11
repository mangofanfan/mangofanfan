<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '语言服务器协议'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        Language Server Protocol，语言服务器协议，微软主导的一种语义高亮模式。
      </p>
      <p class="font-misans">
        代码编辑器、IDE 通过协议与专用的语言服务器进行通信，从而实现一个语言服务器为多种编辑器、IDE
        提供语义高亮、智能补全等高级功能，避免为每种编辑器、IDE 分别开发专用的语言扩展。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
