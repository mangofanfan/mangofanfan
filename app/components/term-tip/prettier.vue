<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Prettier'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">一个供 Node 项目使用的代码风格、格式化工具。</p>
      <p class="font-misans">
        可用于以提前设置的风格格式化代码库，确保项目的代码风格一致，并消除不同开发者留下的代码风格差异。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
