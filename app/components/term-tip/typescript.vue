<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'TypeScript'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一门为 JavaScript 添加了类型提示与更多便捷性的语言，由微软主导。</p>
      <p class="font-misans">
        TypeScript 相比 JavaScript 更加安全，在复杂项目中编码也更快，因为其天生杜绝了 JavaScript
        潜在的类型不安全问题。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
