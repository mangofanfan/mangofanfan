<script setup lang="ts">
import TermTip from '~/components/term-tip.vue'

const { name } = defineProps<{
  name?: string
}>()

const term = computed(() => {
  return name ? name : 'Markdown'
})
</script>

<template>
  <term-tip :term>
    <template #content>
      <p class="font-misans">使用广泛的标记语言，同时适合人类阅读与 AI 思考。</p>
    </template>
  </term-tip>
</template>

<style scoped></style>
