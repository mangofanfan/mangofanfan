<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'LLM'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">大语言模型（Large Language Model），即大规模的语言模型。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
