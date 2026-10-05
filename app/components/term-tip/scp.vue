<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'SCP 基金会'
})
const links = [{ name: '中分 Wiki', url: 'https://scp-wiki-cn.wikidot.com/' }]
</script>

<template>
  <term-tip :term :see-links="links">
    <template #content>
      <p>SCP 基金会是一项网络共笔创作。</p>
      <p>
        基金会世界观假定人类生存的世界存在许多不为人知的异常，而基金会以
        <prose-strong>S</prose-strong>ecure（控制） <prose-strong>C</prose-strong>ontain（收容）
        <prose-strong>P</prose-strong>rotect（保护） 为宗旨，保护人类文明。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
