<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Eslint'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一个供 Node 项目使用的代码问题检查工具。</p>
      <p class="font-misans">
        可用于以提前设置的规则检查代码库中的各种问题，在开发过程中减少代码漏洞和错误。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
