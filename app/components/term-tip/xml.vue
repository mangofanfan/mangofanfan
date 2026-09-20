<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'XML'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">
        可扩展标记语言（Extensible Markup Language），一种用于存储和传输数据的纯文本文件格式。
      </p>
      <p class="font-misans">
        类似于 JSON，但比 JSON 语法更复杂；编程语言无关，任何编程语言或操作系统都可解析处理。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
