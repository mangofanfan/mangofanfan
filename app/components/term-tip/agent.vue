<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : '智能体'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">智能体（Agent）是由 AI 控制的自主决策应用程序的统称。</p>
      <p class="font-misans">
        简单来说，智能体的结构离不开一个 while
        循环，在每一次循环中调用模型，同时按照模型的决策执行其他任务。
      </p>
    </template>
  </term-tip>
</template>

<style scoped></style>
