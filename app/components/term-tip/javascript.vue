<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'JavaScript'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一门为浏览器环境的网页功能所设计的解释型编程语言。</p>
      <p class="font-misans">如今借助 Node.js，其使用面已经显著扩大。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
